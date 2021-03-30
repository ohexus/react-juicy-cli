import { Quotes } from '../../enums';

export const hookJsTemplate = (
  name: string,
  quotes: Quotes,
): string => `import { useRef, useEffect } from ${quotes}react${quotes};

export default function ${name}(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
`;
