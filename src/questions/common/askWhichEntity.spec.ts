import inquirer from 'inquirer';
import askWhichEntity from './askWhichEntity';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askWhichEntity', () => {
  it('returns which entity', async () => {
    const entity = 'foo';

    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ entity });

    expect(await askWhichEntity()).toEqual(entity);
  });
});
