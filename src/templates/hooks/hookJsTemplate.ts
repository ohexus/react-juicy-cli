const hookJsTemplate = (name: string): string => `import { useRef, useEffect } from 'react';

const ${name} = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default ${name};
`;

export default hookJsTemplate;
