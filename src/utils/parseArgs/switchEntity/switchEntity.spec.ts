import switchEntity from './switchEntity';
import { ProgLangNames, StyleLangs, TestLibs, TestTypes } from '../../../enums';

describe('switchEntity', () => {
  const emptyArgs = {};
  const progFlags = ['--javascript', '--typescript'];
  const styleFlags = ['--css', '--sass', '--scss', '--less'];
  const testLibFlags = ['--enzyme', '--testing-library'];
  const testTypeFlags = ['--integration', '--unit'];

  it.each`
    args                        | flags        | expected
    ${{ '--javascript': true }} | ${progFlags} | ${ProgLangNames.JS}
    ${{ '--typescript': true }} | ${progFlags} | ${ProgLangNames.TS}
  `('switches prog lang to $expected', ({ args, flags, expected }) => {
    expect(switchEntity(args, flags, ProgLangNames)).toEqual(expected);
  });

  it.each`
    args                  | flags         | expected
    ${{ '--css': true }}  | ${styleFlags} | ${StyleLangs.CSS}
    ${{ '--sass': true }} | ${styleFlags} | ${StyleLangs.SASS}
    ${{ '--scss': true }} | ${styleFlags} | ${StyleLangs.SCSS}
    ${{ '--less': true }} | ${styleFlags} | ${StyleLangs.LESS}
  `('switches style lang to $expected', ({ args, flags, expected }) => {
    expect(switchEntity(args, flags, StyleLangs)).toEqual(expected);
  });

  it.each`
    args                             | flags           | expected
    ${{ '--enzyme': true }}          | ${testLibFlags} | ${TestLibs.Enzyme}
    ${{ '--testing-library': true }} | ${testLibFlags} | ${TestLibs.TestingLibrary}
  `('switches test lib to $expected', ({ args, flags, expected }) => {
    expect(switchEntity(args, flags, TestLibs)).toEqual(expected);
  });

  it.each`
    args                         | flags            | expected
    ${{ '--integration': true }} | ${testTypeFlags} | ${TestTypes.Integration}
    ${{ '--unit': true }}        | ${testTypeFlags} | ${TestTypes.Unit}
  `('switches test type to $expected', ({ args, flags, expected }) => {
    expect(switchEntity(args, flags, TestTypes)).toEqual(expected);
  });

  it.each`
    args         | flags            | entitiesEnum     | expected
    ${emptyArgs} | ${progFlags}     | ${ProgLangNames} | ${null}
    ${emptyArgs} | ${styleFlags}    | ${StyleLangs}    | ${null}
    ${emptyArgs} | ${testLibFlags}  | ${TestLibs}      | ${null}
    ${emptyArgs} | ${testTypeFlags} | ${TestTypes}     | ${null}
  `('returns null if no flag matched', ({ args, flags, entitiesEnum, expected }) => {
    expect(switchEntity(args, flags, entitiesEnum)).toEqual(expected);
  });
});
