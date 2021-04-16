import { TestTypes } from '../../enums';

const enzymeTemplate = (name: string, testType: TestTypes): string => {
  const testMethod = testType === TestTypes.Unit ? 'shallow' : 'mount';

  return `import React from 'react';
import { ${testMethod} } from 'enzyme';

import ${name} from './${name}';

describe('${name}', () => {
  it('should mount', () => {
    const wrapper = ${testMethod}(<${name} />);

    expect(wrapper).toMatchSnapshot();
  });
});
`;
};

export default enzymeTemplate;
