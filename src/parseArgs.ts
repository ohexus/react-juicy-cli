import arg from 'arg';

import { config } from './config';
import { generateComponent, generateContext, generateHook, logHelp, logVersion } from './commands';
import { capitalizeFirstLetter, replaceWithUse } from './utils';

import { Configs, GenerationEntities, ProgLangNames, Quotes, StyleLangs, TestLibs, TestTypes } from './enums';
import { ComponentConfigBasic, ContextConfigBasic, GlobalConfig, HookConfigBasic } from './interfaces';

function severalFlagsMessage(flags: string[]): string {
  const message = flags.reduce((acc, next, index) => {
    if (index !== 0) {
      if (index < flags.length - 1) {
        acc += ', ';
      } else {
        acc += ' and ';
      }
    }

    return (acc += next);
  }, '');

  return message + ' flags can only be used separately!';
}

export async function parseArgs(rawArgs: string[]): Promise<void> {
  const args = arg(
    {
      // Flags
      '--help': Boolean,
      '--version': Boolean,
      '--component': String,
      '--context': String,
      '--hook': String,
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

  const isSeveralEntities =
    (args['--component'] && args['--hook']) ||
    (args['--component'] && args['--context']) ||
    (args['--hook'] && args['--context']);
  if (isSeveralEntities) {
    throw new Error(severalFlagsMessage(['--component', '--context', '--hook']));
  }

  const isSeveralProgLangs = args['--javascript'] && args['--typescript'];
  if (isSeveralProgLangs) {
    throw new Error(severalFlagsMessage(['--javascript', '--typescript']));
  }

  const isSeveralStyleLangs =
    (args['--css'] && args['--scss']) ||
    (args['--css'] && args['--sass']) ||
    (args['--css'] && args['--less']) ||
    (args['--scss'] && args['--sass']) ||
    (args['--scss'] && args['--less']) ||
    (args['--sass'] && args['--less']);
  if (isSeveralStyleLangs) {
    throw new Error(severalFlagsMessage(['--css', '--scss', '--sass', '--less']));
  }

  const isSeveralTestLibs = args['--enzyme'] && args['--testing-library'];
  if (isSeveralTestLibs) {
    throw new Error(severalFlagsMessage(['--enzyme', '--testing-library']));
  }

  const isSeveralTestTypes = args['--unit'] && args['--integration'];
  if (isSeveralTestTypes) {
    throw new Error(severalFlagsMessage(['--unit', '--integration']));
  }

  const isSeveralQuotes = args['--single-quotes'] && args['--double-quotes'];
  if (isSeveralQuotes) {
    throw new Error(severalFlagsMessage(['--single-quotes', '--double-quotes']));
  }

  config.set(Configs.Global, {
    quotes: args['--double-quotes'] ? Quotes.Double : Quotes.Single,
  } as GlobalConfig);

  const prog = (() => {
    if (args['--javascript']) {
      return ProgLangNames.JS;
    } else if (args['--typescript']) {
      return ProgLangNames.TS;
    } else {
      return null;
    }
  })();

  const style = (() => {
    if (args['--css']) {
      return StyleLangs.CSS;
    } else if (args['--scss']) {
      return StyleLangs.SCSS;
    } else if (args['--sass']) {
      return StyleLangs.SASS;
    } else if (args['--less']) {
      return StyleLangs.LESS;
    } else {
      return null;
    }
  })();

  const testLib = (() => {
    if (args['--enzyme']) {
      return TestLibs.Enzyme;
    } else if (args['--testing-library']) {
      return TestLibs.TestingLibrary;
    } else {
      return null;
    }
  })();

  const testType = (() => {
    if (args['--unit']) {
      return TestTypes.Unit;
    } else if (args['--integration']) {
      return TestTypes.Integration;
    } else {
      return null;
    }
  })();

  if (args['--component']) {
    const name = capitalizeFirstLetter(args['--component']);

    config.set(`${Configs.Global}.entity`, GenerationEntities.Component);
    config.set(`${Configs.Global}.name`, name);

    config.set(Configs.Component, {
      name,
      prog,
      style,
      testLib,
      testType,
      skipStyles: args['--skip'] || args['--skip-styles'] || false,
      skipTests: args['--skip'] || args['--skip-tests'] || false,
    } as ComponentConfigBasic);

    await generateComponent();
  } else if (args['--context']) {
    const name = capitalizeFirstLetter(args['--context']);

    config.set(`${Configs.Global}.entity`, GenerationEntities.Context);
    config.set(`${Configs.Global}.name`, name);

    config.set(Configs.Context, {
      name,
      prog,
    } as ContextConfigBasic);

    await generateContext();
  } else if (args['--hook']) {
    const name = replaceWithUse(args['--hook']);

    config.set(`${Configs.Global}.entity`, GenerationEntities.Hook);
    config.set(`${Configs.Global}.name`, name);

    config.set(Configs.Hook, {
      name,
      prog,
    } as HookConfigBasic);

    await generateHook();
  } else {
    throw new Error('No entity specified!');
  }
}
