import { testEnzymeTemplate, testTestingLibraryTemplate } from '../../templates';

import { TestLibNames, TestLibExts } from '../../enums';

export function switchTestLib(
  lib: TestLibNames,
): [TestLibExts, typeof testEnzymeTemplate | typeof testTestingLibraryTemplate] {
  if (lib === TestLibNames.ENZYME) {
    return [TestLibExts.ENZYME, testEnzymeTemplate];
  } else if (lib === TestLibNames.TESTING_LIB) {
    return [TestLibExts.TESTING_LIB, testTestingLibraryTemplate];
  } else {
    return [TestLibExts.ENZYME, testEnzymeTemplate];
  }
}
