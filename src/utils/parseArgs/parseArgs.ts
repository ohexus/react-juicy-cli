import arg from 'arg';
import config from '../../config';

import { generateComponent, generateContext, generateHook, generateTest, logHelp, logVersion } from '../../commands';
import { FLAGS } from '../../constants';
import { askComponentConfig, askContextConfig, askHookConfig, askTestConfig } from '../../questions';

import { Configs, GenerationEntities, ProgLangNames, Quotes, StyleLangs, TestLibs, TestTypes } from '../../enums';
import { GlobalConfig } from '../../interfaces';

import isSeveralFlags from './isSeveralFlags';
import switchEntity from './switchEntity';
import pregenerationSettings from './pregenerationSettings';

async function parseArgs(rawArgs: string[]): Promise<void> {
  const args = arg(
    {
      // Flags
      '--help': Boolean,
      '--version': Boolean,
      '--component': String,
      '--context': String,
      '--hook': String,
      '--test': String,
      '--javascript': Boolean,
      '--typescript': Boolean,
      '--css': Boolean,
      '--scss': Boolean,
      '--sass': Boolean,
      '--less': Boolean,
      '--enzyme': Boolean,
      '--testing-library': Boolean,
      '--unit': Boolean,
      '--integration': Boolean,
      '--skip': Boolean,
      '--skip-styles': Boolean,
      '--skip-tests': Boolean,
      '--single-quotes': Boolean,
      '--double-quotes': Boolean,
      // Aliases
      '-h': '--help',
      '-v': '--version',
      '--cmp': '--component',
      '--ctx': '--context',
      '--hk': '--hook',
      '--js': '--javascript',
      '--ts': '--typescript',
      '--enz': '--enzyme',
      '--test-lib': '--testing-library',
      '-u': '--unit',
      '-i': '--integration',
      '--skipS': '--skip-styles',
      '--skipT': '--skip-tests',
      '--sq': '--single-quotes',
      '--dq': '--double-quotes',
      // Alternatives
      '--skip-style': '--skip-styles',
      '--skipStyle': '--skip-styles',
      '--skipStyles': '--skip-styles',
      '--skip-test': '--skip-tests',
      '--skipTest': '--skip-tests',
      '--skipTests': '--skip-tests',
      '--testing-lib': '--testing-library',
      '--testingLib': '--testing-library',
      '--testingLibrary': '--testing-library',
    },
    { argv: rawArgs },
  );

  if (args['--help']) {
    logHelp();
    return;
  }

  if (args['--version']) {
    logVersion();
    return;
  }

  if (!args['--component'] && !args['--context'] && !args['--hook'] && !args['--test']) {
    throw new Error('No entity specified!');
  }

  isSeveralFlags(args, ['--component', '--context', '--hook']);
  isSeveralFlags(args, ['--javascript', '--typescript']);
  isSeveralFlags(args, ['--css', '--sass', '--scss', '--less']);
  isSeveralFlags(args, ['--enzyme', '--testing-library']);
  isSeveralFlags(args, ['--integration', '--unit']);
  isSeveralFlags(args, ['--single-quotes', '--double-quotes']);

  const prog = switchEntity(args, ['--javascript', '--typescript'], ProgLangNames);
  const style = switchEntity(args, ['--css', '--sass', '--scss', '--less'], StyleLangs);
  const testLib = switchEntity(args, ['--enzyme', '--testing-library'], TestLibs);
  const testType = switchEntity(args, ['--integration', '--unit'], TestTypes);

  config.set(Configs.Global, {
    prog,
    quotes: args['--double-quotes'] ? Quotes.Double : Quotes.Single,
    skipStyles: args['--skip'] || args['--skip-styles'] || false,
    skipTests: args['--skip'] || args['--skip-tests'] || false,
  } as GlobalConfig);

  if (args['--component']) {
    await pregenerationSettings(GenerationEntities.Component, {
      name: args['--component'],
      style: style as StyleLangs,
    });

    await askComponentConfig();
    await generateComponent();
    return;
  }

  if (args['--context']) {
    await pregenerationSettings(GenerationEntities.Context, {
      name: args['--context'],
    });

    await askContextConfig();
    await generateContext();
    return;
  }

  if (args['--hook']) {
    await pregenerationSettings(GenerationEntities.Component, {
      name: args['--hook'],
    });

    await askHookConfig();
    await generateHook();
    return;
  }

  if (args['--test']) {
    await pregenerationSettings(GenerationEntities.Component, {
      lib: testLib as TestLibs,
      type: testType as TestTypes,
      name: args['--test'],
    });

    await askTestConfig();
    await generateTest();
    return;
  }

  if (args['--component'] || args['--hook']) {
    await askTestConfig();
    await generateTest();
    return;
  }
}

export default parseArgs;
