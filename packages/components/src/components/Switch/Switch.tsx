import * as React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useControllableState } from '../../hooks/useControllableState';

// Context
type SwitchContextType = {
  checked: boolean;
  disabled?: boolean;
  toggle: () => void;
};

const SwitchContext = React.createContext<SwitchContextType>({
  checked: false,
  disabled: false,
  toggle: () => {},
});

export const useSwitch = () => React.useContext(SwitchContext);

// Root
export interface SwitchProps extends Omit<React.ComponentProps<'button'>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      children,
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = useControllableState<boolean>({
      value: checkedProp,
      defaultValue: defaultChecked ?? false,
      onChange: onCheckedChange,
    });

    const toggle = React.useCallback(() => {
      if (!disabled) setChecked(!checked);
    }, [checked, disabled, setChecked]);

    return (
      <SwitchContext.Provider value={{ checked: checked ?? false, disabled, toggle }}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={toggle}
          className={twMerge(
            clsx(
              'inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-background/30 focus-visible:ring-offset-2',
              className,
            ),
          )}
          {...props}
        >
          {children}
        </button>
      </SwitchContext.Provider>
    );
  },
);

Switch.displayName = 'Switch';

// Track
export type SwitchTrackProps = React.ComponentProps<'span'>;

export const SwitchTrack = ({ className, children, ...props }: SwitchTrackProps) => {
  const { checked, disabled } = useSwitch();

  return (
    <span
      className={twMerge(
        clsx(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200',
          checked ? 'bg-background' : 'bg-slate-300',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </span>
  );
};

SwitchTrack.displayName = 'SwitchTrack';

// Thumb
export type SwitchThumbProps = React.ComponentProps<'span'>;

export const SwitchThumb = ({ className, ...props }: SwitchThumbProps) => {
  const { checked } = useSwitch();

  return (
    <span
      className={twMerge(
        clsx(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5',
          className,
        ),
      )}
      {...props}
    />
  );
};

SwitchThumb.displayName = 'SwitchThumb';

// Label
export type SwitchLabelProps = React.ComponentProps<'span'>;

export const SwitchLabel = ({ className, ...props }: SwitchLabelProps) => {
  const { disabled } = useSwitch();

  return (
    <span
      className={twMerge(clsx('select-none text-sm', disabled && 'opacity-50', className))}
      {...props}
    />
  );
};

SwitchLabel.displayName = 'SwitchLabel';
