import inquirer from 'inquirer';

import { ProgLangNames } from '../enums';
import { ComponentConfig } from '../interfaces';

const progLangQuestion = {
  name: 'prog',
  type: 'list',
  message: 'Which programming language do you want to use?',
  choices: Object.values(ProgLangNames),
};

export async function askProgLang(): Promise<ComponentConfig['prog']> {
  return (await inquirer.prompt([progLangQuestion])).prog;
}
