import arg from 'arg';
import clear from 'clear';

import { config } from './config';
import { capitalizeFirstLetter, replaceWithUse } from './utils';

import { Configs, ProgLangNames, Quotes, StyleLangNames, TestLibNames } from './enums';
import { ComponentConfigBasic, ContextConfigBasic, GlobalConfig, HookConfigBasic } from './interfaces';
import { generateComponent, generateContext, generateHook, logHelp, logVersion } from './commands';

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
      return StyleLangNames.CSS;
    } else if (args['--scss']) {
      return StyleLangNames.SCSS;
    } else if (args['--sass']) {
      return StyleLangNames.SASS;
    } else if (args['--less']) {
      return StyleLangNames.LESS;
    } else {
      return null;
    }
  })();

  const testLib = (() => {
    if (args['--enzyme']) {
      return TestLibNames.Enzyme;
    } else if (args['--testing-library']) {
      return TestLibNames.TestingLibrary;
    } else {
      return null;
    }
  })();

  if (args['--component']) {
    config.set(Configs.Component, {
      name: capitalizeFirstLetter(args['--component']),
      prog,
      style,
      testLib,
      skipStyles: args['--skip'] || args['--skip-styles'] || false,
      skipTests: args['--skip'] || args['--skip-tests'] || false,
    } as ComponentConfigBasic);

    await generateComponent();
  } else if (args['--context']) {
    config.set(Configs.Context, {
      name: capitalizeFirstLetter(args['--context']),
      prog,
    } as ContextConfigBasic);

    await generateContext();
  } else if (args['--hook']) {
    config.set(Configs.Hook, {
      name: replaceWithUse(args['--hook']),
      prog,
    } as HookConfigBasic);

    await generateHook();
  }

  clear();
}
