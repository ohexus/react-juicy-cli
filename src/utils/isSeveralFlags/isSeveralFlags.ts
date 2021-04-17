import arg from 'arg';

export function severalFlagsMessage(flags: string[]): string {
  const message = flags.reduce((acc, next, index) => {
    if (index !== 0) {
      if (index < flags.length - 1) {
        acc += ', ';
      } else {
        acc += ' and ';
      }
    }

    return (acc += next);
  }, '');

  return message + ' flags can only be used separately!';
}

export default function isSeveralFlags<T extends arg.Spec>(args: arg.Result<T>, flags: string[]): void {
  let isOneFlagUsed = false;

  for (const flag of flags) {
    if (!!args[flag]) {
      if (isOneFlagUsed) {
        throw new Error(severalFlagsMessage(flags));
      }
      isOneFlagUsed = true;
    }
  }
}
