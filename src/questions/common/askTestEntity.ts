import inquirer from 'inquirer';

import { GenerationEntities } from '../enums';
import { QuestionReply, TestEntity } from '../interfaces';

const testEntityQuestion = {
  name: 'testEntity',
  type: 'list',
  message: 'Which entity do you want to test?',
  choices: [GenerationEntities.Component, GenerationEntities.Hook],
};

async function askTestEntity(): Promise<TestEntity> {
  return ((await inquirer.prompt([testEntityQuestion])) as QuestionReply<TestEntity>).testEntity;
}

export default askTestEntity;
