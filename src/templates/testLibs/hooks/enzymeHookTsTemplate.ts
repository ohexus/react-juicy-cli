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

export default enzymeHookTsTemplate;
