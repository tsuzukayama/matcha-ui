import * as React from 'react';

type UseControllableStateParams<T> = {
  value?: T; // controlled value
  defaultValue?: T; // uncontrolled initial value
  onChange?: (value: T) => void; // called in both modes
};

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>) {
  const isControlled = value !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = React.useState<T | undefined>(defaultValue);

  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = React.useCallback(
    (next: T | ((prev: T | undefined) => T)) => {
      const nextValue =
        typeof next === 'function' ? (next as (prev: T | undefined) => T)(currentValue) : next;

      if (!isControlled) setUncontrolledValue(nextValue);
      onChange?.(nextValue);
    },
    [currentValue, isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}
