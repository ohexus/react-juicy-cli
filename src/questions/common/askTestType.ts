import inquirer from 'inquirer';

import { TestTypes } from '../../enums';
import { QuestionReply, TestConfig } from '../../interfaces';

const testTypeQuestion = {
  name: 'testType',
  type: 'list',
  message: 'Which testing library do you want to use?',
  choices: Object.values(TestTypes),
};

async function askTestType(): Promise<TestConfig['type']> {
  return ((await inquirer.prompt([testTypeQuestion])) as QuestionReply<TestTypes>).testType;
}

export default askTestType;
