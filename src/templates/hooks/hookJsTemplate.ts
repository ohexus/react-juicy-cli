export const hookJsTemplate = (name: string): string => `import { useRef, useEffect } from 'react';

export default function ${name}(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
`;
