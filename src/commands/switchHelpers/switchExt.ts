import { ProgLangNames, ProgLangExts } from '../../enums';

export function switchExt(lang: ProgLangNames): ProgLangExts {
  if (lang === ProgLangNames.JS) {
    return ProgLangExts.JS;
  } else if (lang === ProgLangNames.TS) {
    return ProgLangExts.TS;
  } else {
    return ProgLangExts.JS;
  }
}