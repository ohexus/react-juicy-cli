import arg from 'arg';
import config from '../../config';

import {
  generateComponent,
  generateContext,
  generateHook,
  generateTest,
  logHelp,
  logVersion,
} from '../../commands';
import { FLAGS } from '../../constants';
import {
  askComponentConfig,
  askContextConfig,
  askHookConfig,
  askTestConfig,
} from '../../questions';

import isSeveralFlags from './isSeveralFlags';
import pregenerationSettings from './pregenerationSettings';
import switchEntity from './switchEntity';
import {
  Configs,
  GenerationEntities,
  ProgLangNames,
  Quotes,
  StyleLangs,
  TestLibs,
  TestTypes,
} from '../../enums';
import { GlobalConfig } from '../../interfaces';

function switchEntities<T extends arg.Spec>(args: arg.Result<T>) {
  const prog = switchEntity(args, ['--javascript', '--typescript'], ProgLangNames);
  const style = switchEntity(args, ['--css', '--sass', '--scss', '--less'], StyleLangs);
  const testLib = switchEntity(args, ['--enzyme', '--testing-library'], TestLibs);
  const testType = switchEntity(args, ['--integration', '--unit'], TestTypes);

  return { prog, style, testLib, testType };
}

function checkForNoEntity<T extends arg.Spec>(args: arg.Result<T>) {
  if (
    !args['--component'] &&
    !args['--context'] &&
    !args['--hook'] &&
    !args['--test'] &&
    !args['--test-component'] &&
    !args['--test-hook']
  ) {
    throw new Error('No entity specified!');
  }
}

function checkForSeveralFlags<T extends arg.Spec>(args: arg.Result<T>) {
  isSeveralFlags(args, ['--component', '--context', '--hook', '--test']);
  isSeveralFlags(args, ['--javascript', '--typescript']);
  isSeveralFlags(args, ['--css', '--sass', '--scss', '--less']);
  isSeveralFlags(args, ['--enzyme', '--testing-library']);
  isSeveralFlags(args, ['--integration', '--unit']);
  isSeveralFlags(args, ['--single-quotes', '--double-quotes']);
}

function setMainEntityAfterGeneration<T extends arg.Spec>(args: arg.Result<T>) {
  const setEntity = (entity: GenerationEntities) => {
    config.set(`${Configs.Global}.entity`, entity);
  };

  if (args['--component']) {
    setEntity(GenerationEntities.Component);
    return;
  }
  if (args['--context']) {
    setEntity(GenerationEntities.Context);
    return;
  }
  if (args['--hook']) {
    setEntity(GenerationEntities.Hook);
    return;
  }
  if (args['--test']) {
    setEntity(GenerationEntities.Test);
    return;
  }
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
    path: args['--path'] || '.',
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
  }

  if (args['--context']) {
    await pregenerationSettings(GenerationEntities.Context, {
      name: args['--context'],
    });

    await askContextConfig();
    await generateContext();
  }

  if (args['--hook']) {
    await pregenerationSettings(GenerationEntities.Hook, {
      name: args['--hook'],
    });

    await askHookConfig();
    await generateHook();
  }

  const testName =
    args['--test'] ||
    args['--test-component'] ||
    args['--test-hook'] ||
    args['--component'] ||
    args['--hook'];

  if (testName) {
    let testEntity = GenerationEntities.Component;

    if (args['--test-hook'] || args['--hook']) {
      testEntity = GenerationEntities.Hook;
    }

    await pregenerationSettings(GenerationEntities.Test, {
      lib: testLib as TestLibs,
      name: testName,
      testEntity,
      type: testType as TestTypes,
    });

    await askTestConfig();
    await generateTest();
  }

  setMainEntityAfterGeneration(args);
}
