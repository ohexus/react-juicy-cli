import inquirer from 'inquirer';

import { ProgLangNames } from '../enums';
import { GlobalConfig, QuestionReply } from '../interfaces';

const progLangQuestion = {
  name: 'prog',
  type: 'list',
  message: 'Which programming language do you want to use?',
  choices: Object.values(ProgLangNames),
};

async function askProgLang(): Promise<GlobalConfig['prog']> {
  return ((await inquirer.prompt([progLangQuestion])) as QuestionReply<ProgLangNames>).prog;
}

export default askProgLang;
