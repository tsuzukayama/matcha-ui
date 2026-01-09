import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-full font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30',
            'disabled:pointer-events-none disabled:opacity-50',
            {
              primary: 'bg-background text-foreground hover:bg-background/90 hover:shadow-md',
              secondary:
                'bg-foreground text-background ring-1 ring-background/20 hover:bg-foreground/5 hover:shadow-md',
              ghost: 'bg-transparent text-background hover:bg-transparent/10',
              outline:
                'border border-background text-background hover:bg-background/10 hover:shadow-md',
              link: 'text-background hover:text-background/80',
            }[variant],
            {
              sm: 'h-9 px-3 text-sm',
              md: 'h-10 px-4 text-sm',
              lg: 'h-11 px-5 text-base',
              icon: 'h-10 w-10 p-0',
            }[size],
          ),
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
