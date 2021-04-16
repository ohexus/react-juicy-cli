import { ProgLangNames, ProgLangExts } from '../../enums';

function switchExt(lang: ProgLangNames): ProgLangExts {
  switch (lang) {
    case ProgLangNames.JS:
      return ProgLangExts.JS;

    case ProgLangNames.TS:
      return ProgLangExts.TS;

    default:
      return ProgLangExts.TS;
  }
}

export default switchExt;
