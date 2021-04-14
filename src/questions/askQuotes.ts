import inquirer from 'inquirer';

import { Quotes } from '../enums';
import { GlobalConfig, QuestionReply } from '../interfaces';

const quotesQuestion = {
  name: 'quotes',
  type: 'list',
  message: 'Which quotes do you want to use?',
  choices: Object.keys(Quotes),
};

type QuotesKeys = keyof typeof Quotes;

async function askQuotes(): Promise<GlobalConfig['quotes']> {
  const quotesKey = ((await inquirer.prompt([quotesQuestion])) as QuestionReply<QuotesKeys>).quotes;

  return Quotes[quotesKey];
}

export default askQuotes;
