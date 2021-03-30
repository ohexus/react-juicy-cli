export const hookTsTemplate = (name: string): string => `import { useRef, useEffect } from 'react';

export default function ${name}<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
`;
