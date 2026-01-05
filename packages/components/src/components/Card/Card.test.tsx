import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardContent, CardFooter, CardHeader, CardProps, CardTitle } from './Card';
import { Button } from '../Button/Button';

describe('Card', () => {
  const CardComponent = (args: CardProps) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card header</CardTitle>
      </CardHeader>
      <CardContent>Card content</CardContent>
      <CardFooter>Card footer</CardFooter>
    </Card>
  );
  it('renders children', () => {
    render(CardComponent({}));
    expect(screen.getByRole('heading', { name: 'Card header' })).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(CardComponent({}));
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot with className', () => {
    const { container } = render(CardComponent({ className: 'bg-red-500' }));
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot with children', () => {
    const { container } = render(CardComponent({ children: 'Card content' }));
    expect(container).toMatchSnapshot();
  });
});
