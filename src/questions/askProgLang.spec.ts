import inquirer from 'inquirer';
import askProgLang from './askProgLang';

jest.mock('inquirer', () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Object.assign(jest.requireActual('inquirer'), {
    prompt: jest.fn(),
  }),
);

describe('askProgLang', () => {
  it('returns prog lang', async () => {
    const prog = 'foo';

    ((inquirer.prompt as unknown) as jest.Mock).mockResolvedValue({ prog });

    expect(await askProgLang()).toEqual(prog);
  });
});
