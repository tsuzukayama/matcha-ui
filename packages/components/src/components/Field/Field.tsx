import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

export type FieldProps = React.ComponentProps<'div'> & {
  error?: string;
};

export const Field = ({ className, error, children, ...props }: FieldProps) => {
  return (
    <div
      className={twMerge(clsx('flex flex-col gap-3', error && 'text-red-500', className))}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { error });
        }
        return child;
      })}
    </div>
  );
};

Field.displayName = 'Field';

export type FieldLabelProps = React.ComponentProps<'label'> & {
  error?: string;
};

export const FieldLabel = ({ className, error, ...props }: FieldLabelProps) => {
  return (
    <label
      className={twMerge(
        clsx('pl-4 text-sm font-medium text-background dark:text-foreground', className),
        error && 'text-red-500',
      )}
      {...props}
    />
  );
};

FieldLabel.displayName = 'FieldLabel';

export type FieldDescriptionProps = React.ComponentProps<'p'>;

export const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => {
  return <p className={twMerge(clsx('pl-4 text-xs text-gray-500', className))} {...props} />;
};

FieldDescription.displayName = 'FieldDescription';

export type FieldErrorProps = React.ComponentProps<'p'>;

export const FieldError = ({ className, ...props }: FieldErrorProps) => {
  return <p className={twMerge(clsx('pl-4 text-xs text-red-500', className))} {...props} />;
};

FieldError.displayName = 'FieldError';
