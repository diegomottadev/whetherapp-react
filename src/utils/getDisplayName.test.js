import { expect, test } from 'vitest';
import { getDisplayName } from './getDisplayName';

test('uses displayName first, then the function name, then a fallback', () => {
  const Named = () => null;
  const WithDisplayName = () => null;
  WithDisplayName.displayName = 'Custom';

  expect(getDisplayName(WithDisplayName)).toBe('Custom');
  expect(getDisplayName(Named)).toBe('Named');
  expect(getDisplayName(Object.assign(() => null, { displayName: '' }))).toBe('Component');
});
