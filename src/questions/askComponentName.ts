import inquirer from 'inquirer';

import { capitalizeFirstLetter } from '../utils';

import { ComponentConfig } from '../interfaces';

const componentNameQuestion = {
  name: 'name',
  type: 'input',
  message: 'Enter a name for the component:',
  validate: (name: string) => {
    if (name.length) {
      return true;
    } else {
      return 'Please enter a name.';
    }
  },
};

export async function askComponentName(): Promise<ComponentConfig['name']> {
  return capitalizeFirstLetter((await inquirer.prompt([componentNameQuestion])).name);
}
