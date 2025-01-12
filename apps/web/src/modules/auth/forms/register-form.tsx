import { cn } from '@/lib/utils';
import { f } from '@/lib/forms/form-builder';
import { Form } from '@/lib/fantom/components/form';
import { FormProps } from '@/types';

const registerForm = f
  .fields(
    f.row(f.text('email').label('Email').placeholder('m@example.com')),
    f.row(f.text('password').label('Password'))
  )
  .title('Create a AzVisio account')
  .description('Sign up with your email address')
  .submit('Register');

export function RegisterForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={registerForm} onSubmit={onSubmit} />
    </div>
  );
}
