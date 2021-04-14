import inquirer from 'inquirer';

import { TestLibs } from '../enums';
import { ComponentConfig, QuestionReply } from '../interfaces';

const testLibQuestion = {
  name: 'testLib',
  type: 'list',
  message: 'Which testing library do you want to use?',
  choices: Object.values(TestLibs),
};

async function askTestLib(): Promise<ComponentConfig['testLib']> {
  return ((await inquirer.prompt([testLibQuestion])) as QuestionReply<TestLibs>).testLib;
}

export default askTestLib;
