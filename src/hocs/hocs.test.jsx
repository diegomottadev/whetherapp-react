import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import withLoading from './withLoading';
import withError from './withError';
import withEmptyState from './withEmptyState';
import withWeatherState from './withWeatherState';

const Content = ({ text }) => <p>{text}</p>;
const Placeholder = () => <p>placeholder</p>;

describe('withLoading', () => {
  const ContentWithLoading = withLoading(Placeholder)(Content);

  test('shows the placeholder while loading', () => {
    render(<ContentWithLoading isLoading text="hello" />);
    expect(screen.getByText('placeholder')).toBeInTheDocument();
    expect(screen.queryByText('hello')).not.toBeInTheDocument();
  });

  test('shows the component with its props once loaded', () => {
    render(<ContentWithLoading isLoading={false} text="hello" />);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  test('has a display name for DevTools', () => {
    expect(ContentWithLoading.displayName).toBe('withLoading(Content)');
  });
});

describe('withError', () => {
  const ContentWithError = withError(Content);

  test('shows the error and calls onRetry from the button', () => {
    const onRetry = vi.fn();
    render(<ContentWithError error="Server error." onRetry={onRetry} text="hello" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Server error.');
    expect(screen.queryByText('hello')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test('shows the component when there is no error', () => {
    render(<ContentWithError error={null} onRetry={vi.fn()} text="hello" />);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});

describe('withEmptyState', () => {
  const List = ({ items }) => <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>;
  const ListWithEmptyState = withEmptyState(({ items }) => items.length === 0, 'Nothing here.')(List);

  test('shows the message when isEmpty returns true', () => {
    render(<ListWithEmptyState items={[]} />);
    expect(screen.getByText('Nothing here.')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('shows the component otherwise', () => {
    render(<ListWithEmptyState items={['a']} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

describe('withWeatherState', () => {
  const Probe = ({ icon, label, condition }) => <p>{`${icon}|${label}|${String(condition)}`}</p>;
  const ProbeWithWeatherState = withWeatherState(Probe);

  test('turns the condition into icon and label, and does not pass condition down', () => {
    render(<ProbeWithWeatherState condition="Rain" />);
    expect(screen.getByText('rain|Rain|undefined')).toBeInTheDocument();
  });

  test('uses the unknown state for a condition it does not know', () => {
    render(<ProbeWithWeatherState condition="Volcano" />);
    expect(screen.getByText('na|No data|undefined')).toBeInTheDocument();
  });
});
