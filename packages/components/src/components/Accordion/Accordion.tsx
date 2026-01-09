import * as React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useControllableState } from '../../hooks/useControllableState';
import { ChevronDownIcon } from 'lucide-react';

// Contexts
type AccordionContextType = {
  value: string | string[] | undefined;
  onItemToggle: (itemValue: string) => void;
  type: 'single' | 'multiple';
  collapsible?: boolean;
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export const useAccordion = () => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('useAccordion must be used within Accordion');
  return ctx;
};

type AccordionItemContextType = {
  value: string;
  isOpen: boolean;
  disabled?: boolean;
};

const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null);

export const useAccordionItem = () => {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) throw new Error('useAccordionItem must be used within AccordionItem');
  return ctx;
};

// Accordion (root)
interface AccordionSingleProps extends Omit<React.ComponentProps<'div'>, 'onChange' | 'defaultValue'> {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}

interface AccordionMultipleProps extends Omit<React.ComponentProps<'div'>, 'onChange' | 'defaultValue'> {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export const Accordion = ({
  className,
  children,
  type,
  collapsible,
  ...props
}: AccordionProps) => {
  // Single mode
  const [singleValue, setSingleValue] = useControllableState<string>({
    value: type === 'single' ? (props as AccordionSingleProps).value : undefined,
    defaultValue: type === 'single' ? (props as AccordionSingleProps).defaultValue : undefined,
    onChange: type === 'single' ? (props as AccordionSingleProps).onValueChange : undefined,
  });

  // Multiple mode
  const [multipleValue, setMultipleValue] = useControllableState<string[]>({
    value: type === 'multiple' ? (props as AccordionMultipleProps).value : undefined,
    defaultValue: type === 'multiple' ? ((props as AccordionMultipleProps).defaultValue ?? []) : [],
    onChange: type === 'multiple' ? (props as AccordionMultipleProps).onValueChange : undefined,
  });

  const onItemToggle = React.useCallback(
    (itemValue: string) => {
      if (type === 'single') {
        if (singleValue === itemValue && collapsible) {
          setSingleValue('');
        } else {
          setSingleValue(itemValue);
        }
      } else {
        const current = multipleValue ?? [];
        if (current.includes(itemValue)) {
          setMultipleValue(current.filter((v) => v !== itemValue));
        } else {
          setMultipleValue([...current, itemValue]);
        }
      }
    },
    [type, singleValue, multipleValue, collapsible, setSingleValue, setMultipleValue],
  );

  const value = type === 'single' ? singleValue : multipleValue;

  // Extract the specific props that shouldn't be passed to the div
  const {
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    ...divProps
  } = props as AccordionSingleProps & AccordionMultipleProps;

  return (
    <AccordionContext.Provider value={{ value, onItemToggle, type, collapsible }}>
      <div className={twMerge(clsx('flex flex-col', className))} {...divProps}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.displayName = 'Accordion';

// AccordionItem
export interface AccordionItemProps extends React.ComponentProps<'div'> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = ({ className, value, disabled, ...props }: AccordionItemProps) => {
  const { value: openValue, type } = useAccordion();

  const isOpen =
    type === 'single' ? openValue === value : Array.isArray(openValue) && openValue.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={twMerge(clsx('border-b border-slate-200', className))}
        {...props}
      />
    </AccordionItemContext.Provider>
  );
};

AccordionItem.displayName = 'AccordionItem';

// AccordionTrigger
export type AccordionTriggerProps = React.ComponentProps<'button'>;

export const AccordionTrigger = ({ className, children, ...props }: AccordionTriggerProps) => {
  const { onItemToggle } = useAccordion();
  const { value, isOpen, disabled } = useAccordionItem();

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      disabled={disabled}
      onClick={() => !disabled && onItemToggle(value)}
      className={twMerge(
        clsx(
          'flex w-full items-center justify-between py-4 text-left font-medium transition-colors',
          'hover:text-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/30',
          disabled && 'pointer-events-none opacity-50',
          className,
        ),
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={clsx('h-4 w-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
      />
    </button>
  );
};

AccordionTrigger.displayName = 'AccordionTrigger';

// AccordionContent
export type AccordionContentProps = React.ComponentProps<'div'>;

export const AccordionContent = ({ className, children, ...props }: AccordionContentProps) => {
  const { isOpen } = useAccordionItem();

  return (
    <div
      data-state={isOpen ? 'open' : 'closed'}
      className={clsx(
        'grid transition-[grid-template-rows] duration-200 ease-out',
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="overflow-hidden">
        <div className={twMerge(clsx('pb-4', className))} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
};

AccordionContent.displayName = 'AccordionContent';
