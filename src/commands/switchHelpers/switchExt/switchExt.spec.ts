import switchExt from './switchExt';

import { ProgLangNames, ProgLangExts } from '../../../enums';

describe('switchExt', () => {
  it('switches extension', () => {
    const LANGS = [ProgLangNames.JS, ProgLangNames.TS];
    const EXTS = [ProgLangExts.JS, ProgLangExts.TS];

    LANGS.forEach((lang, index) => {
      const ext = switchExt(lang);

      expect(ext).toEqual(EXTS[index]);
    });
  });

  it('returns default extension', () => {
    const ext = switchExt(('foo' as unknown) as ProgLangNames);

    expect(ext).toEqual(ProgLangExts.TS);
  });
});
