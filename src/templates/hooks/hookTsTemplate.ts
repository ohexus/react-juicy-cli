const hookTsTemplate = (name: string): string => `import { useRef, useEffect } from 'react';

const ${name} = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default ${name};
`;

export default hookTsTemplate;
