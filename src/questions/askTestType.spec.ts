import inquirer from 'inquirer';
import askTestType from './askTestType';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askTestType', () => {
  it('returns test type', async () => {
    const testType = 'foo';

    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ testType });

    expect(await askTestType()).toEqual(testType);
  });
});
