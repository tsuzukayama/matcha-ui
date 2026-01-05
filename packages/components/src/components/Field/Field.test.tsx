import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Field, FieldDescription, FieldError, FieldLabel, FieldProps } from './Field';
import { Input } from '../Input/Input';

describe('Field', () => {
  const FieldComponent = (args: FieldProps) => (
    <Field {...args}>
      <FieldLabel>Field Label</FieldLabel>
      <Input placeholder="Input" />
      <FieldDescription>Field Description</FieldDescription>
      {args.error && <FieldError>{args.error}</FieldError>}
    </Field>
  );
  it('renders children', () => {
    render(FieldComponent({}));
    expect(screen.getByRole('label', { name: 'Field Label' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Input')).toBeInTheDocument();
    expect(screen.getByText('Field Description')).toBeInTheDocument();
  });
  it('matches snapshot', () => {
    const { container } = render(FieldComponent({}));
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot with className', () => {
    const { container } = render(FieldComponent({ className: 'bg-red-500' }));
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot with error', () => {
    const { container } = render(FieldComponent({ error: 'Field Error' }));
    expect(screen.getByText('Field Error')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
