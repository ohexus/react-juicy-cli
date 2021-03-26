import inquirer from 'inquirer';

import { TestLibNames } from '../enums';
import { ComponentConfig } from '../interfaces';

const testLibQuestion = {
  name: 'testLib',
  type: 'list',
  message: 'Which testing library do you want to use?',
  choices: Object.values(TestLibNames),
};

export async function askTestLib(): Promise<ComponentConfig['testLib']> {
  return (await inquirer.prompt([testLibQuestion])).testLib;
}
