import inquirer from 'inquirer';

import askEntityName from './askEntityName';

import { GenerationEntities } from '../enums';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askEntityName', () => {
  it('returns entity name', async () => {
    const name = 'foo';

    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ name });

    expect(await askEntityName(GenerationEntities.Component)).toEqual(name);
  });
});
