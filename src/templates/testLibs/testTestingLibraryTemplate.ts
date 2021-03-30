import { Quotes } from '../../enums';

export const testTestingLibraryTemplate = (
  name: string,
  quotes: Quotes,
): string => `import React from ${quotes}react${quotes};
import { render, screen } from ${quotes}@testing-library/react${quotes};
import ${quotes}@testing-library/jest-dom/extend-expect${quotes};

import ${name} from ${quotes}./${name}${quotes};

describe(${quotes}${name}${quotes}, () => {
  it(${quotes}should mount${quotes}, () => {
    render(<${name} />);
    
    const element = screen.getByTestId(${quotes}${name}.testId${quotes});
    expect(element).toBeInTheDocument();
  });
});
`;
