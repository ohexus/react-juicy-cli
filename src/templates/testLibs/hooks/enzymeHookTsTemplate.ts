const enzymeHookTsTemplate = (name: string): string => `import React, { FC } from 'react';
import { mount } from 'enzyme';

import ${name} from './${name}';

interface NullComponentProps {
  value: string;
}

interface TestComponentProps {
  val: string;
}

describe('${name}', () => {
  const NullComponent: FC<NullComponentProps> = () => null;
  const TestComponent: FC<TestComponentProps> = ({ val }) => {
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

export default enzymeHookTsTemplate;
