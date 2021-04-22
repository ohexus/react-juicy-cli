import inquirer from 'inquirer';
import askStyleLang from './askStyleLang';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askStyleLang', () => {
  it('returns style lang', async () => {
    const style = 'foo';

    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ style });

    expect(await askStyleLang()).toEqual(style);
  });
});
