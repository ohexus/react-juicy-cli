import switchTestLibTemplate, { switchTemplateForComponent, switchTemplateForHook } from './switchTestLibTemplate';

import { GenerationEntities, ProgLangNames, TestLibs, TestTypes } from '../../../enums';
import {
  enzymeComponentTemplate,
  testingLibraryComponentTemplate,
  enzymeHookJsTemplate,
  enzymeHookTsTemplate,
  testingLibraryHookTemplate,
} from '../../../templates';

jest.mock('../../../templates', () => ({
  __esModule: true,
  enzymeComponentTemplate: jest.fn(),
  testingLibraryComponentTemplate: jest.fn(),
  enzymeHookJsTemplate: jest.fn(),
  enzymeHookTsTemplate: jest.fn(),
  testingLibraryHookTemplate: jest.fn(),
}));

const mockEnzymeComponentTemplate = 'foo';
const mockTestingLibraryComponentTemplate = 'bar';
const mockEnzymeHookJsTemplate = 'baz';
const mockEnzymeHookTsTemplate = 'qux';
const mockTestingLibraryHookTemplate = 'quuz';

const unknownTestLib = ('foo' as unknown) as TestLibs;
const unknownGenerationEntity = ('bar' as unknown) as GenerationEntities;
const unknownProgLangName = ('baz' as unknown) as ProgLangNames;

const NAME = 'foo';
const TEST_TYPES = [TestTypes.Integration, TestTypes.Unit];

describe('switchTemplateForComponent', () => {
  beforeEach(() => {
    (enzymeComponentTemplate as jest.Mock).mockImplementation(() => mockEnzymeComponentTemplate);
    (testingLibraryComponentTemplate as jest.Mock).mockImplementation(() => mockTestingLibraryComponentTemplate);
  });

  it('switches template', () => {
    const enzymeTemplate = switchTemplateForComponent(TestLibs.Enzyme);
    const testingLibraryTemplate = switchTemplateForComponent(TestLibs.TestingLibrary);

    TEST_TYPES.forEach((type) => {
      expect(enzymeTemplate(NAME, type)).toEqual(mockEnzymeComponentTemplate);
      expect(testingLibraryTemplate(NAME, type)).toEqual(mockTestingLibraryComponentTemplate);
    });
  });

  it('returns default template', () => {
    const template = switchTemplateForComponent(unknownTestLib);

    TEST_TYPES.forEach((type) => {
      expect(template(NAME, type)).toEqual(mockEnzymeComponentTemplate);
    });
  });
});

describe('switchTemplateForHook', () => {
  beforeEach(() => {
    (enzymeHookJsTemplate as jest.Mock).mockImplementation(() => mockEnzymeHookJsTemplate);
    (enzymeHookTsTemplate as jest.Mock).mockImplementation(() => mockEnzymeHookTsTemplate);
    (testingLibraryHookTemplate as jest.Mock).mockImplementation(() => mockTestingLibraryHookTemplate);
  });

  it('switches js template', () => {
    const enzymeTemplate = switchTemplateForHook(TestLibs.Enzyme, ProgLangNames.JS);
    const testingLibraryTemplate = switchTemplateForHook(TestLibs.TestingLibrary, ProgLangNames.JS);

    expect(enzymeTemplate(NAME)).toEqual(mockEnzymeHookJsTemplate);
    expect(testingLibraryTemplate(NAME)).toEqual(mockTestingLibraryHookTemplate);
  });

  it('switches ts template', () => {
    const enzymeTemplate = switchTemplateForHook(TestLibs.Enzyme, ProgLangNames.TS);
    const testingLibraryTemplate = switchTemplateForHook(TestLibs.TestingLibrary, ProgLangNames.TS);

    expect(enzymeTemplate(NAME)).toEqual(mockEnzymeHookTsTemplate);
    expect(testingLibraryTemplate(NAME)).toEqual(mockTestingLibraryHookTemplate);
  });

  it('returns default template', () => {
    const template = switchTemplateForHook(unknownTestLib, unknownProgLangName);

    expect(template(NAME)).toEqual(mockEnzymeHookTsTemplate);
  });
});

describe('switchTestLibTemplate', () => {
  beforeEach(() => {
    (enzymeComponentTemplate as jest.Mock).mockImplementation(() => mockEnzymeComponentTemplate);
    (testingLibraryComponentTemplate as jest.Mock).mockImplementation(() => mockTestingLibraryComponentTemplate);
    (enzymeHookJsTemplate as jest.Mock).mockImplementation(() => mockEnzymeHookJsTemplate);
    (enzymeHookTsTemplate as jest.Mock).mockImplementation(() => mockEnzymeHookTsTemplate);
    (testingLibraryHookTemplate as jest.Mock).mockImplementation(() => mockTestingLibraryHookTemplate);
  });

  it('switches template', () => {
    const template1 = switchTestLibTemplate(TestLibs.Enzyme, GenerationEntities.Component, ProgLangNames.JS);
    const template2 = switchTestLibTemplate(TestLibs.TestingLibrary, GenerationEntities.Component, ProgLangNames.TS);
    const template3 = switchTestLibTemplate(TestLibs.Enzyme, GenerationEntities.Hook, ProgLangNames.JS);
    const template4 = switchTestLibTemplate(TestLibs.Enzyme, GenerationEntities.Hook, ProgLangNames.TS);
    const template5 = switchTestLibTemplate(TestLibs.TestingLibrary, GenerationEntities.Hook, ProgLangNames.TS);

    expect(template1(NAME, TestTypes.Unit)).toEqual(mockEnzymeComponentTemplate);
    expect(template2(NAME, TestTypes.Unit)).toEqual(mockTestingLibraryComponentTemplate);
    expect(template3(NAME, TestTypes.Unit)).toEqual(mockEnzymeHookJsTemplate);
    expect(template4(NAME, TestTypes.Unit)).toEqual(mockEnzymeHookTsTemplate);
    expect(template5(NAME, TestTypes.Unit)).toEqual(mockTestingLibraryHookTemplate);
  });

  it('returns default template', () => {
    const template = switchTestLibTemplate(unknownTestLib, unknownGenerationEntity, unknownProgLangName);

    TEST_TYPES.forEach((type) => {
      expect(template(NAME, type)).toEqual(mockEnzymeComponentTemplate);
    });
  });
});
