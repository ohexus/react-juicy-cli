import { Quotes } from '../../enums';

export const testEnzymeTemplate = (name: string, quotes: Quotes): string => `import React from ${quotes}react${quotes};
import { shallow } from ${quotes}enzyme${quotes};

import ${name} from ${quotes}./${name}${quotes};

describe(${quotes}${name}${quotes}, () => {
  it(${quotes}should mount${quotes}, () => {
    const wrapper = shallow(<${name} />);

    expect(wrapper.length).toBe(1);
  });
});
`;
