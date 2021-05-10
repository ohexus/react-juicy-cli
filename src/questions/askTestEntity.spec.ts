import inquirer from 'inquirer';
import askTestEntity from './askTestEntity';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askTestEntity', () => {
  it('returns entity to test', async () => {
    const testEntity = 'foo';

    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ testEntity });

    expect(await askTestEntity()).toEqual(testEntity);
  });
});
