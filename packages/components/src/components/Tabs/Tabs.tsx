import * as React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useControllableState } from '../../hooks/useControllableState';

// Context
type TabsContextType = {
  value?: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextType>({
  value: undefined,
  onValueChange: () => {},
});

export const useTabs = () => React.useContext(TabsContext);

// Tabs (root)
export interface TabsProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = ({
  className,
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: TabsProps) => {
  const [value, setValue] = useControllableState<string>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  return (
    <TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <div className={twMerge(clsx('flex flex-col', className))} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.displayName = 'Tabs';

// TabsList
export type TabsListProps = React.ComponentProps<'div'>;

export const TabsList = ({ className, ...props }: TabsListProps) => {
  return (
    <div
      role="tablist"
      className={twMerge(
        clsx('inline-flex items-center gap-1 rounded-full bg-background p-1', className),
      )}
      {...props}
    />
  );
};

TabsList.displayName = 'TabsList';

// TabsTrigger
export interface TabsTriggerProps extends React.ComponentProps<'button'> {
  value: string;
}

export const TabsTrigger = ({ className, value, disabled, ...props }: TabsTriggerProps) => {
  const { value: activeValue, onValueChange } = useTabs();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={twMerge(
        clsx(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/30',
          isActive ? 'bg-white text-background shadow-sm' : 'text-white hover:bg-foreground/30',
          disabled && 'pointer-events-none opacity-50',
          className,
        ),
      )}
      {...props}
    />
  );
};

TabsTrigger.displayName = 'TabsTrigger';

// TabsContent
export interface TabsContentProps extends React.ComponentProps<'div'> {
  value: string;
}

export const TabsContent = ({ className, value, ...props }: TabsContentProps) => {
  const { value: activeValue } = useTabs();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={twMerge(clsx('mt-4 focus:outline-none', className))}
      {...props}
    />
  );
};

TabsContent.displayName = 'TabsContent';
