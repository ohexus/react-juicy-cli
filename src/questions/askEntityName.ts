import inquirer from 'inquirer';

import { GenerationEntities } from '../enums';

const entityNameQuestion = (entity: GenerationEntities) => ({
  name: 'name',
  type: 'input',
  message: `Enter a name for the ${entity}:`,
  validate: (name: string) => {
    if (name.length) {
      return true;
    } else {
      return 'Please enter a name.';
    }
  },
});

export async function askEntityName(entity: GenerationEntities): Promise<string> {
  return (await inquirer.prompt([entityNameQuestion(entity)])).name;
}
