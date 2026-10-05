import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherList from './WeatherList';

test('shows the empty state when there are no cities', () => {
  render(<WeatherList cities={[]} weatherByCity={{}} onRetry={vi.fn()} />);

  expect(screen.getByText('There are no cities to show yet.')).toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});
