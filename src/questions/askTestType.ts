import inquirer from 'inquirer';

import { TestTypes } from '../enums';
import { ComponentConfig } from '../interfaces';

const testTypeQuestion = {
  name: 'testType',
  type: 'list',
  message: 'Which testing library do you want to use?',
  choices: Object.values(TestTypes),
};

async function askTestType(): Promise<ComponentConfig['testType']> {
  return (await inquirer.prompt([testTypeQuestion])).testType;
}

export default askTestType;
