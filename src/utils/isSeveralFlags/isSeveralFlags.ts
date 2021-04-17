import arg from 'arg';

import severalFlagsMessage from '../severalFlagsMessage';

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
