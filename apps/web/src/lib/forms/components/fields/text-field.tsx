import { Input } from '@/components/ui/input';
import { BaseFieldComponent } from './base-field';

export function TextFieldComponent(props) {
  return (
    <>
      <BaseFieldComponent {...props} />
      <Input {...props} type={props.isEmail ? 'email' : 'text'} />
    </>
  );
}
