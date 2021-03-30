import { testEnzymeTemplate, testTestingLibraryTemplate } from '../../templates';

import { TestLibNames, TestLibExts } from '../../enums';

export function switchTestLib(
  lib: TestLibNames,
): [TestLibExts, typeof testEnzymeTemplate | typeof testTestingLibraryTemplate] {
  if (lib === TestLibNames.Enzyme) {
    return [TestLibExts.Enzyme, testEnzymeTemplate];
  } else if (lib === TestLibNames.TestingLibrary) {
    return [TestLibExts.TestingLibrary, testTestingLibraryTemplate];
  } else {
    return [TestLibExts.Enzyme, testEnzymeTemplate];
  }
}
