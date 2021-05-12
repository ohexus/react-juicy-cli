import inquirer from 'inquirer';

import { TestLibs } from '../../enums';
import { QuestionReply, TestConfig } from '../../interfaces';

const testLibQuestion = {
  name: 'testLib',
  type: 'list',
  message: 'Which testing library do you want to use?',
  choices: Object.values(TestLibs),
};

async function askTestLib(): Promise<TestConfig['lib']> {
  return ((await inquirer.prompt([testLibQuestion])) as QuestionReply<TestLibs>).testLib;
}

export default askTestLib;
