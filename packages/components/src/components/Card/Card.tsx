import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={twMerge(
        clsx('rounded-lg border border-background p-6 shadow-md dark:border-foreground', className),
      )}
      {...props}
    />
  );
};

Card.displayName = 'Card';

export type CardHeaderProps = React.ComponentProps<'div'>;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return <div className={twMerge(clsx('mb-6', className))} {...props} />;
};

CardHeader.displayName = 'CardHeader';

export type CardTitleProps = React.ComponentProps<'h2'>;

export const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <h2
      className={twMerge(
        clsx('text-lg font-medium text-background dark:text-foreground', className),
      )}
      {...props}
    />
  );
};

CardTitle.displayName = 'CardTitle';

export type CardContentProps = React.ComponentProps<'div'>;

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div className={twMerge(clsx('', className))} {...props} />;
};

CardContent.displayName = 'CardContent';

export type CardFooterProps = React.ComponentProps<'div'>;

export const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return <div className={twMerge(clsx('mt-6', className))} {...props} />;
};

CardFooter.displayName = 'CardFooter';

export type CardProps = React.ComponentProps<'div'>;
