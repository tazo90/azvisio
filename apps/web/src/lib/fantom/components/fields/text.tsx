import { Input } from '@/components/ui/input';
import { BaseFieldComponent } from './base';

export function TextFieldComponent(props) {
  return <Input {...props} type={props.isEmail ? 'email' : 'text'} />;
}
