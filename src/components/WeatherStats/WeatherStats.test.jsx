import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherStats from './WeatherStats';

const weather = { temperature: 20, humidity: 82, windSpeed: 3.6, condition: 'Clear' };

test('shows 1 stat per entry in the config', () => {
  render(<WeatherStats weather={weather} />);

  expect(screen.getByText('Humidity')).toBeInTheDocument();
  expect(screen.getByText('82 %')).toBeInTheDocument();
  expect(screen.getByText('Wind')).toBeInTheDocument();
  expect(screen.getByText('3.6 m/s')).toBeInTheDocument();
});

test('takes a custom list of stats', () => {
  const stats = [{ field: 'temperature', label: 'Feels like', format: value => `${value}°` }];
  render(<WeatherStats weather={weather} stats={stats} />);

  expect(screen.getByText('Feels like')).toBeInTheDocument();
  expect(screen.getByText('20°')).toBeInTheDocument();
  expect(screen.queryByText('Humidity')).not.toBeInTheDocument();
});
