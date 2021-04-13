import { enzymeTemplate, testingLibraryTemplate } from '../../templates';

import { TestLibs } from '../../enums';

function switchTestLib(lib: TestLibs): typeof enzymeTemplate | typeof testingLibraryTemplate {
  if (lib === TestLibs.Enzyme) {
    return enzymeTemplate;
  } else if (lib === TestLibs.TestingLibrary) {
    return testingLibraryTemplate;
  }
  return enzymeTemplate;
}

export default switchTestLib;
