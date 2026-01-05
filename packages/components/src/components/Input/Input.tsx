import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error ? true : undefined}
        className={twMerge(
          clsx(
            'rounded-full border border-background',
            'px-4 py-2 text-sm',
            'focus:border-background focus:outline-background focus:ring-0 focus:ring-offset-0',
            props.disabled ? 'opacity-50' : '',
            error ? 'border-red-500 focus:border-red-500 focus:outline-red-500' : '',
            className,
          ),
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
