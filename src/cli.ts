import arg from 'arg';
import chalk from 'chalk';
import clear from 'clear';

import { generateComponent } from './commands';
import { config } from './config';
import { askComponentConfig } from './questions';
import { capitalizeFirstLetter } from './utils';

import { ProgLangNames, StyleLangNames, TestLibNames } from './enums';
import { ComponentConfigBasiс } from './interfaces';

function parseArgs(rawArgs: string[]): ComponentConfigBasiс {
  const args = arg(
    {
      // Flags
      '--component': String,
      '--javascript': Boolean,
      '--typescript': Boolean,
      '--css': Boolean,
      '--scss': Boolean,
      '--sass': Boolean,
      '--less': Boolean,
      '--enzyme': Boolean,
      '--testing-library': Boolean,
      // Aliases
      '-c': '--component',
      '--js': '--javascript',
      '--ts': '--typescript',
      '--enz': '--enzyme',
      '--test-lib': '--testing-library',
    },
    { permissive: true, argv: rawArgs },
  );

  return {
    name: args['--component'] ? capitalizeFirstLetter(args['--component']) : null,
    prog: (() => {
      if (args['--javascript']) {
        return ProgLangNames.JS;
      } else if (args['--typescript']) {
        return ProgLangNames.TS;
      } else {
        return null;
      }
    })(),
    style: (() => {
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
    })(),
    testLib: (() => {
      if (args['--enzyme']) {
        return TestLibNames.ENZYME;
      } else if (args['--testing-library']) {
        return TestLibNames.TESTING_LIB;
      } else {
        return null;
      }
    })(),
  };
}

export default async function cli(argv: string[]): Promise<void> {
  try {
    clear();

    const args = argv.slice(2);

    if (!args.length) {
      config.set('component', await askComponentConfig());
    } else {
      config.set('component', parseArgs(args));
    }

    await generateComponent();

    console.log(chalk.green('DONE'));
  } catch (error) {
    console.log(chalk.red('Something went wrong'));
    console.error(error);

    process.exit(1);
  }
}
