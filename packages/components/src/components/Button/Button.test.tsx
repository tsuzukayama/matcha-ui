import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button', { name: 'Click' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  //snpashot tests
  it('matches snapshot', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot with variant', () => {
    const { container } = render(<Button variant="primary">Click me</Button>);
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot with size', () => {
    const { container } = render(<Button size="sm">Click me</Button>);
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot with type', () => {
    const { container } = render(<Button type="submit">Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});
