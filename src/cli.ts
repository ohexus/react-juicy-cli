import config from './config';

import { askAndGenerate, parseArgs, redStr, printAfterword } from './utils';

import { Configs, Quotes } from './enums';

export default async function cli(argv: string[]): Promise<void> {
  try {
    const args = argv.slice(2);

    if (!args.length) {
      await askAndGenerate();
    } else {
      config.set(`${Configs.Global}.quotes`, Quotes.Single);
      await parseArgs(args);
    }

    printAfterword();

    process.exit(0);
  } catch (error) {
    console.log(redStr(`\n${(error as Error).message}\n`));

    process.exit(1);
  }
}
