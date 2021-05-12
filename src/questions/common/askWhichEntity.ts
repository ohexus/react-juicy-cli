import inquirer from 'inquirer';

import { GenerationEntities } from '../../enums';
import { QuestionReply } from '../../interfaces';

const entityQuestion = {
  name: 'entity',
  type: 'list',
  message: 'Which entity do you want to generate?',
  choices: Object.values(GenerationEntities),
};

async function askWhichEntity(): Promise<GenerationEntities> {
  return ((await inquirer.prompt([entityQuestion])) as QuestionReply<GenerationEntities>).entity;
}

export default askWhichEntity;
