import { Quotes } from '../../enums';

export const hookTsTemplate = (
  name: string,
  quotes: Quotes,
): string => `import { useRef, useEffect } from ${quotes}react${quotes};

export default function ${name}<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
`;
