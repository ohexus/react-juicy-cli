import arg from 'arg';

import { config } from './config';
import { capitalizeFirstLetter, replaceWithUse } from './utils';

import { GenerationEntities, ProgLangNames, StyleLangNames, TestLibNames } from './enums';
import { ComponentConfigBasic, HookConfigBasic } from './interfaces';

export function parseArgs(rawArgs: string[]): void {
  const args = arg(
    {
      // Flags
      '--component': String,
      '--hook': String,
      '--javascript': Boolean,
      '--typescript': Boolean,
      '--css': Boolean,
      '--scss': Boolean,
      '--sass': Boolean,
      '--less': Boolean,
      '--enzyme': Boolean,
      '--testing-library': Boolean,
      // Aliases
      '--cmp': '--component',
      '--hk': '--hook',
      '--js': '--javascript',
      '--ts': '--typescript',
      '--enz': '--enzyme',
      '--test-lib': '--testing-library',
    },
    { permissive: true, argv: rawArgs },
  );

  if (args['--component'] && args['--hook']) {
    throw new Error("--component and --hook flags can't be used together");
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
      return TestLibNames.ENZYME;
    } else if (args['--testing-library']) {
      return TestLibNames.TESTING_LIB;
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
    } as ComponentConfigBasic);
  } else if (args['--hook']) {
    config.set(GenerationEntities.Hook, {
      name: replaceWithUse(args['--hook']),
      prog,
    } as HookConfigBasic);
  }
}
