import inquirer from 'inquirer';

import { GenerationEntities } from '../enums';
import { QuestionReply } from '../interfaces';

const pathQuestion = (entity: GenerationEntities | 'entity') => ({
  name: 'path',
  type: 'input',
  message: `Please type a path where to generate ${entity} or leave an empty string to generate ${entity} right here:`,
});

async function askPath(entity?: GenerationEntities): Promise<string | null> {
  const dirPath = ((await inquirer.prompt([pathQuestion(entity || 'entity')])) as QuestionReply<string>).path;

  if (!dirPath || !dirPath.length) {
    return '.';
  }

  return dirPath;
}

export default askPath;
