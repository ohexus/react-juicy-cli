const enzymeHookTemplateTS = (name: string): string => `import React, { FC } from 'react';
import { mount } from 'enzyme';

import ${name} from './${name}';

interface TestComponentProps {
  value: string;
}

interface NullComponentProps {
  prevValue?: string;
  currValue: string;
}

describe('${name}', () => {
  const NullComponent: FC<NullComponentProps> = () => null;
  const TestComponent: FC<TestComponentProps> = ({ value }) => {
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

export default enzymeHookTemplateTS;
