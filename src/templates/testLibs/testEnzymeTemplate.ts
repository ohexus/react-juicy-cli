export const testEnzymeTemplate = (name = 'Component') => `import React from 'react';
import { shallow } from 'enzyme';

import ${name} from './${name}';

describe('${name}', () => {
  it('should mount', () => {
    const wrapper = shallow(<${name} />);

    expect(wrapper.length).toBe(1);
  });
});
`;
