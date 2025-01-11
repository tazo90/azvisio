import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { RadioField } from '../../fields';
import { BaseFieldComponent } from './base';

interface RadioFieldComponentProps {
  field: ReturnType<RadioField['getConfig']>;
  onChange: (value: string) => void;
  value?: string;
}

export function RadioFieldComponent(props: RadioFieldComponentProps) {
  const { name, options, defaultValue, layout, onChange, value } = props;

  return (
    <>
      <BaseFieldComponent {...props} />
      <RadioGroup
        defaultValue={defaultValue}
        value={value}
        onValueChange={onChange}
        className={cn('gap-2', layout === 'horizontal' ? 'flex' : 'flex flex-col')}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
            <Label className="text-xs" htmlFor={`${name}-${option.value}`}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
}
