import { Result, Spec } from 'arg';

import isSeveralFlags from './isSeveralFlags';
import severalFlagsMessage from '../severalFlagsMessage';

jest.mock('../severalFlagsMessage', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('isSeveralFlags', () => {
  const ERROR_MESSAGE = 'flags error';

  beforeEach(() => {
    (severalFlagsMessage as jest.Mock).mockReturnValue(ERROR_MESSAGE);
  });

  it('returns nothing if only one flag is used', () => {
    const mockArgs = { foo: true, bar: false, baz: false };
    const mockFlags = ['foo', 'bar', 'baz'];

    expect(() => isSeveralFlags((mockArgs as unknown) as Result<Spec>, mockFlags)).not.toThrow();
    expect(severalFlagsMessage).not.toHaveBeenCalled();
  });

  it('throws error if two or more flags are used', () => {
    const mockArgs = { qux: true, quux: true, quuz: true };
    const mockFlags = ['qux', 'quux', 'quuz'];

    expect(() => isSeveralFlags((mockArgs as unknown) as Result<Spec>, mockFlags)).toThrow(ERROR_MESSAGE);
    expect(severalFlagsMessage).toHaveBeenCalledTimes(1);
  });
});
