import arg from 'arg';

import { config } from './config';
import { capitalizeFirstLetter, replaceWithUse } from './utils';

import { GenerationEntities, ProgLangNames, StyleLangNames, TestLibNames } from './enums';
import { ComponentConfigBasic, ContextConfigBasic, HookConfigBasic } from './interfaces';
import { generateComponent, generateContext, generateHook } from './commands';

function severalFlagsMessage(flags: string[]) {
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
      // Aliases
      '--cmp': '--component',
      '--ctx': '--context',
      '--hk': '--hook',
      '--js': '--javascript',
      '--ts': '--typescript',
      '--enz': '--enzyme',
      '--test-lib': '--testing-library',
      '--skipS': '--skip-styles',
      '--skipT': '--skip-tests',
      // Alternatives
      '--skipStyles': '--skip-styles',
      '--skipTests': '--skip-tests',
      '--testing-lib': '--testing-library',
      '--testingLib': '--testing-library',
      '--testingLibrary': '--testing-library',
    },
    { permissive: true, argv: rawArgs },
  );

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
    config.set(GenerationEntities.Component, {
      name: capitalizeFirstLetter(args['--component']),
      prog,
      style,
      testLib,
      skipStyles: args['--skip'] || args['--skip-styles'] || false,
      skipTests: args['--skip'] || args['--skip-tests'] || false,
    } as ComponentConfigBasic);

    await generateComponent();
  } else if (args['--context']) {
    config.set(GenerationEntities.Context, {
      name: capitalizeFirstLetter(args['--context']),
      prog,
    } as ContextConfigBasic);

    await generateContext();
  } else if (args['--hook']) {
    config.set(GenerationEntities.Hook, {
      name: replaceWithUse(args['--hook']),
      prog,
    } as HookConfigBasic);

    await generateHook();
  }
}
