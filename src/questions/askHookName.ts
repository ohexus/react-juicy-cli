import inquirer from 'inquirer';

import { replaceWithUse } from '../utils';

import { HookConfig } from '../interfaces';

const hookNameQuestion = {
  name: 'name',
  type: 'input',
  message: 'Enter a name for the hook:',
  validate: (name: string) => {
    if (name.length) {
      return true;
    } else {
      return 'Please enter a name.';
    }
  },
};

// TODO: add "use" if missing
export async function askHookName(): Promise<HookConfig['name']> {
  return replaceWithUse((await inquirer.prompt([hookNameQuestion])).name);
}
