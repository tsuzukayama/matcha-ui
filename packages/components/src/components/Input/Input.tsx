import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          clsx(
            'rounded-full border border-background',
            'px-4 py-2 text-sm',
            'focus:border-background focus:outline-background focus:ring-0 focus:ring-offset-0',
            className,
          ),
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
