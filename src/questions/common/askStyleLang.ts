import inquirer from 'inquirer';

import { StyleLangs } from '../../enums';
import { ComponentConfig, QuestionReply } from '../../interfaces';

const styleLangQuestion = {
  name: 'style',
  type: 'list',
  message: 'Which stylesheet language do you want to use?',
  choices: Object.values(StyleLangs),
};

async function askStyleLang(): Promise<ComponentConfig['style']> {
  return ((await inquirer.prompt([styleLangQuestion])) as QuestionReply<StyleLangs>).style;
}

export default askStyleLang;
