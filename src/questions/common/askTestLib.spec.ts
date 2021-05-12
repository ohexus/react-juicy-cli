import inquirer from 'inquirer';
import askTestLib from './askTestLib';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askTestLib', () => {
  it('returns test lib', async () => {
    const testLib = 'foo';

    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ testLib });

    expect(await askTestLib()).toEqual(testLib);
  });
});
