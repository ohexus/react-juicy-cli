import arg from 'arg';
import config from '../../config';

import { generateComponent, generateContext, generateHook, generateTest, logHelp, logVersion } from '../../commands';
import { FLAGS } from '../../constants';
import { askComponentConfig, askContextConfig, askHookConfig, askTestConfig } from '../../questions';

import { Configs, GenerationEntities, ProgLangNames, Quotes, StyleLangs, TestLibs, TestTypes } from '../../enums';
import { GlobalConfig } from '../../interfaces';

import isSeveralFlags from './isSeveralFlags';
import pregenerationSettings from './pregenerationSettings';
import switchEntity from './switchEntity';

function switchEntities<T extends arg.Spec>(args: arg.Result<T>) {
  const prog = switchEntity(args, ['--javascript', '--typescript'], ProgLangNames);
  const style = switchEntity(args, ['--css', '--sass', '--scss', '--less'], StyleLangs);
  const testLib = switchEntity(args, ['--enzyme', '--testing-library'], TestLibs);
  const testType = switchEntity(args, ['--integration', '--unit'], TestTypes);

  return { prog, style, testLib, testType };
}

function checkForNoEntity<T extends arg.Spec>(args: arg.Result<T>) {
  if (!args['--component'] && !args['--context'] && !args['--hook'] && !args['--test']) {
    throw new Error('No entity specified!');
  }
}

function checkForSeveralFlags<T extends arg.Spec>(args: arg.Result<T>) {
  isSeveralFlags(args, ['--component', '--context', '--hook']);
  isSeveralFlags(args, ['--javascript', '--typescript']);
  isSeveralFlags(args, ['--css', '--sass', '--scss', '--less']);
  isSeveralFlags(args, ['--enzyme', '--testing-library']);
  isSeveralFlags(args, ['--integration', '--unit']);
  isSeveralFlags(args, ['--single-quotes', '--double-quotes']);
}

export default async function parseArgs(rawArgs: string[]): Promise<void> {
  const args = arg(FLAGS, { argv: rawArgs });

  if (args['--help']) {
    logHelp();
    return;
  }

  if (args['--version']) {
    logVersion();
    return;
  }

  checkForNoEntity(args);
  checkForSeveralFlags(args);

  const { prog, style, testLib, testType } = switchEntities(args);

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
