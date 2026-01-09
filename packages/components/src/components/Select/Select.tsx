import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { useEffect } from 'react';
import { useControllableState } from './useControllableState';
import { ChevronDownIcon } from 'lucide-react';

type SelectContextType = {
  open?: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
};

export const SelectContext = React.createContext<SelectContextType>({
  open: false,
  setOpen: () => {},
  value: undefined,
  label: undefined,
  onChange: () => {},
});

export const useSelect = () => {
  return React.useContext(SelectContext);
};

export interface SelectProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Select = ({
  className,
  children,
  onChange,
  value: valueProp,
  defaultValue,
  open: openProp,
  onOpenChange,
  defaultOpen,
  ...props
}: SelectProps) => {
  const [value, setValue] = useControllableState<string>({
    value: valueProp,
    defaultValue,
    onChange,
  });

  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });
  const ref = React.useRef<HTMLDivElement>(null);

  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SelectContent,
  ) as React.ReactElement<SelectContentProps> | undefined;

  const options = content?.props.children as React.ReactElement<SelectOptionProps>[] | undefined;

  const label = valueProp
    ? valueProp
    : options?.find((option) => option.props.value === value)?.props.children;

  // on click outside of the select, set isOpen to false
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, []);

  const handleChange = (value: string) => {
    setValue(value);
    onChange?.(value);
  };

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onChange: handleChange, label }}>
      <div
        className={twMerge(
          clsx(
            'relative cursor-pointer rounded-full border border-background px-4 py-2 text-sm',
            className,
          ),
        )}
        onClick={() => setOpen(!open)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

Select.displayName = 'Select';

export type SelectOptionProps = React.ComponentProps<'div'> & {
  value: string;
};

export const SelectOption = ({ className, ...props }: SelectOptionProps) => {
  const { onChange, value } = useSelect();
  const isSelected = value === props.value;

  return (
    <div
      className={twMerge(
        clsx(
          'relative flex h-9 w-full cursor-pointer items-center justify-between px-4 text-sm hover:bg-foreground/90',
          isSelected && 'bg-foreground/90',
          className,
        ),
      )}
      onClick={() => onChange?.(props.value)}
      {...props}
    />
  );
};

SelectOption.displayName = 'SelectOption';

export type SelectTriggerProps = React.ComponentProps<'div'>;

export const SelectTrigger = ({ className, ...props }: SelectTriggerProps) => {
  const { label } = useSelect();

  return (
    <div
      className={twMerge(clsx('flex items-center justify-between text-sm', className))}
      {...props}
    >
      {label ?? props.children}
      <ChevronDownIcon className="size-4 text-background" />
    </div>
  );
};

SelectTrigger.displayName = 'SelectTrigger';

export type SelectContentProps = React.ComponentProps<'div'>;

export const SelectContent = ({ className, ...props }: SelectContentProps) => {
  const { open } = useSelect();

  return (
    <div
      className={twMerge(
        clsx(
          'absolute -top-1 left-0 right-0 overflow-hidden rounded-xl border border-background bg-white text-sm shadow-md',
          'origin-top transform-gpu transition-[opacity,transform] duration-150 ease-out',
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0',
          className,
        ),
      )}
      {...props}
    />
  );
};

SelectContent.displayName = 'SelectContent';
