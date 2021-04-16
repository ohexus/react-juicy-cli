const enzymeHookJsTemplate = (name: string): string => `import React from 'react';
import { mount } from 'enzyme';

import ${name} from './${name}';

describe('${name}', () => {
  const NullComponent = () => null;
  const TestComponent = ({ value }) => {
    const prevValue = ${name}(value);

    return <NullComponent prevValue={prevValue} currValue={value} />;
  };

  const FIRST_VALUE = 'foo';
  const SECOND_VALUE = 'bar';

  it('returns previous value', () => {
    const wrapper = mount(<TestComponent value={FIRST_VALUE} />);

    expect(wrapper.find(NullComponent).prop('prevValue')).toBeUndefined();
    expect(wrapper.find(NullComponent).prop('currValue')).toEqual(FIRST_VALUE);

    wrapper.setProps({ value: SECOND_VALUE });

    expect(wrapper.find(NullComponent).prop('prevValue')).toEqual(FIRST_VALUE);
    expect(wrapper.find(NullComponent).prop('currValue')).toEqual(SECOND_VALUE);
  });
});
`;

export default enzymeHookJsTemplate;
