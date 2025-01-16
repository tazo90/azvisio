import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectField } from '../../fields';

interface SelectFieldComponentProps {
  field: ReturnType<SelectField['getConfig']>;
  onChange: (value: string) => void;
  value: string;
}

export function SelectFieldComponent(props: SelectFieldComponentProps) {
  const { defaultValue, placeholder, onChange, options, value, theme, getFieldStyles } = props;

  return (
    <Select onValueChange={onChange} value={value} defaultValue={defaultValue}>
      <SelectTrigger className={getFieldStyles('select', {})}>
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
  );
}
