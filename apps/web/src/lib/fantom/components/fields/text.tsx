import { Input } from '@/components/ui/input';

export function TextFieldComponent({ password, email, number, theme, getFieldStyles, ...props }) {
  let fieldType = 'text';

  if (password) {
    fieldType = 'password';
  } else if (email) {
    fieldType = 'email';
  } else if (number) {
    fieldType = 'number';
  }

  return <Input {...props} type={fieldType} className={getFieldStyles('input', { size: theme.size })} />;
}
