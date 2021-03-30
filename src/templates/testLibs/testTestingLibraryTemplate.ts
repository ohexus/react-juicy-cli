export const testTestingLibraryTemplate = (name: string): string => `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ${name} from './${name}';

describe('${name}', () => {
  it('should mount', () => {
    render(<${name} />);
    
    const element = screen.getByTestId('${name}.testId');
    expect(element).toBeInTheDocument();
  });
});
`;
