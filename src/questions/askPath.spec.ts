import inquirer from 'inquirer';
import askPath from './askPath';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askPath', () => {
  it('returns path', async () => {
    const path = 'foo';

    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ path });

    expect(await askPath()).toEqual(path);
  });

  it('returns same dir', async () => {
    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ path: '' });

    expect(await askPath()).toEqual('.');
  });
});
