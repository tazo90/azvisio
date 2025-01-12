import { cn } from '@/lib/utils';
import { f } from '@/lib/forms/form-builder';
import { Form } from '@/lib/fantom/components/form';
import { FormProps } from '@/types';

const passwordResetForm = f
  .fields(
    f.row(f.text('password').label('New password')),
    f.row(f.text('password_confirm').label('Confirm new password'))
  )
  .title('Set up a new password')
  .description('Choose a new password that is distinct from your previous one.')
  .submit('Set new password');

export function PasswordResetForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={passwordResetForm} onSubmit={onSubmit} />
    </div>
  );
}
