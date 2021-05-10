const enzymeHookJsTemplate = (name: string): string => `import React from 'react';
import { mount } from 'enzyme';

import ${name} from './${name}';

describe('${name}', () => {
  const NullComponent = () => null;
  const TestComponent = ({ value }) => {
    const value = ${name}(val);

    return <NullComponent value={value} />;
  };

  it('returns value', () => {
    const wrapper = mount(<TestComponent val={FIRST_VALUE} />);

    expect(wrapper.find(NullComponent).prop('value')).toEqual('foo');

    wrapper.setProps({ val: 'bar' });
    wrapper.update();

    expect(wrapper.find(NullComponent).prop('value')).toEqual('bar');
  });
});
`;

export default enzymeHookJsTemplate;
