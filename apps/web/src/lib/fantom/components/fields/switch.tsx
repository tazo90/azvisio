import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SwitchField } from '../../fields';

interface SwitchFieldComponentProps {
  field: ReturnType<SwitchField['getConfig']>;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

export function SwitchFieldComponent({ name, label, onChange, defaultChecked, checked }: SwitchFieldComponentProps) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="space-y-0.5">
        <Label htmlFor={name}>{label}</Label>
      </div>
      <Switch id={name} checked={checked} onCheckedChange={onChange} defaultChecked={defaultChecked} />
    </div>
  );
}
