import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckboxField } from '../../fields';

interface CheckboxFieldComponentProps {
  field: ReturnType<CheckboxField['getConfig']>;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

export function CheckboxFieldComponent({
  name,
  label,
  onChange,
  checked,
  description,
  required,
  defaultChecked,
}: CheckboxFieldComponentProps) {
  return (
    <div className="items-center flex gap-2">
      <Checkbox id={name} checked={checked} onCheckedChange={onChange} defaultChecked={defaultChecked} />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={name}
          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="pl-2 text-red-500">*</span>}
        </Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
