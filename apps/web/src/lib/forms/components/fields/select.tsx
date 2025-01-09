import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectField } from '../../fields';
import { BaseFieldComponent } from './base';

interface SelectFieldComponentProps {
  field: ReturnType<SelectField['getConfig']>;
  onChange: (value: string) => void;
  value: string;
}

export function SelectFieldComponent(props: SelectFieldComponentProps) {
  const { defaultValue, placeholder, onChange, options, value } = props;
  return (
    <>
      <BaseFieldComponent {...props} />
      <Select onValueChange={onChange} value={value} defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
