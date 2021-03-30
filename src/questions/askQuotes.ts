import inquirer from 'inquirer';

import { Quotes } from '../enums';
import { GlobalConfig } from '../interfaces';

const quotesQuestion = {
  name: 'quotes',
  type: 'list',
  message: 'Which quotes do you want to use?',
  choices: Object.keys(Quotes),
};

export async function askQuotes(): Promise<GlobalConfig['quotes']> {
  const quotesKey = (await inquirer.prompt([quotesQuestion])).quotes as keyof typeof Quotes;

  return Quotes[quotesKey];
}
