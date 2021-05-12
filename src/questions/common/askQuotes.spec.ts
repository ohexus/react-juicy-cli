import inquirer from 'inquirer';
import askQuotes from './askQuotes';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askQuotes', () => {
  it('returns quotes', async () => {
    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ quotes: 'Single' });

    expect(await askQuotes()).toEqual("'");
  });
});
