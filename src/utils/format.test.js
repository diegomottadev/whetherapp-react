import { describe, expect, test } from 'vitest';
import { formatHumidity, formatTemperature, formatWind } from './format';

describe('formatTemperature', () => {
  test('rounds to a whole number', () => {
    expect(formatTemperature(18.6)).toBe('19');
    expect(formatTemperature(18.4)).toBe('18');
    expect(formatTemperature(-2.6)).toBe('-3');
  });

  test('shows 0 instead of -0', () => {
    expect(formatTemperature(-0.3)).toBe('0');
  });
});

test('formatWind adds the unit', () => {
  expect(formatWind(3.6)).toBe('3.6 m/s');
});

test('formatHumidity adds the percent sign', () => {
  expect(formatHumidity(82)).toBe('82 %');
});
