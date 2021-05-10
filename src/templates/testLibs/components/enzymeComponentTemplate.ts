import { TestTypes } from '../../../enums';

const enzymeComponentTemplate = (name: string, testType: TestTypes): string => {
  const testMethod = testType === TestTypes.Unit ? 'shallow' : 'mount';

  return `import React from 'react';
import { ${testMethod} } from 'enzyme';

import ${name} from './${name}';

describe('${name}', () => {
  it('renders with required props', () => {
    const wrapper = ${testMethod}(<${name} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with all props', () => {
    const wrapper = ${testMethod}(<${name} />);

    expect(wrapper).toMatchSnapshot();
  });
});
`;
};

export default enzymeComponentTemplate;
