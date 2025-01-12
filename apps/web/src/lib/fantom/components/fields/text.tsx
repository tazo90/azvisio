import { Input } from '@/components/ui/input';

export function TextFieldComponent(props) {
  return <Input {...props} type={props.isEmail ? 'email' : 'text'} />;
}
