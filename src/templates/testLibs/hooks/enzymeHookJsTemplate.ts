const enzymeHookJsTemplate = (name: string): string => `import React from 'react';
import { mount } from 'enzyme';

import ${name} from './${name}';

describe('${name}', () => {
  const NullComponent = () => null;
  const TestComponent = ({ value }) => {
    const value = ${name}(val);

    return <NullComponent value={value} />;
  };

  const FIRST_VALUE = 'foo';
  const SECOND_VALUE = 'bar';

  it('returns value', () => {
    const wrapper = mount(<TestComponent val={FIRST_VALUE} />);

    expect(wrapper.find(NullComponent).prop('value')).toEqual(FIRST_VALUE);

    wrapper.setProps({ val: SECOND_VALUE });
    wrapper.update();

    expect(wrapper.find(NullComponent).prop('value')).toEqual(SECOND_VALUE);
  });
});
`;

export default enzymeHookJsTemplate;
