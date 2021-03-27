import inquirer from 'inquirer';

import { GenerationEntities } from '../enums';

const entityQuestion = {
  name: 'entity',
  type: 'list',
  message: 'Which entity do you want to generate?',
  choices: Object.values(GenerationEntities),
};

export async function askWhichEntity(): Promise<GenerationEntities> {
  return (await inquirer.prompt([entityQuestion])).entity;
}
