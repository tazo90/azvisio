import { Input } from '@/components/ui/input';

export function TextFieldComponent({ field, ...props }) {
  return <Input {...field} type={props.isEmail ? 'email' : 'text'} placeholder={props.placeholder} />;
}
