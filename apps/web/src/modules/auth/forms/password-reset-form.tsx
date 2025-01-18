import { cn } from '@/lib/utils';
import { Form, FormProps } from '@/lib/fantom/components/form';
import { f } from '@/lib/fantom';

const passwordResetForm = f
  .fields(
    f.text('password').label('New password').password().required(),
    f.text('password_confirm').label('Confirm new password').password().required()
  )
  .title('Set up a new password')
  .description('Choose a new password that is distinct from your previous one.')
  .submit('Set new password')
  .theme('modern');

export function PasswordResetForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={passwordResetForm} onSubmit={onSubmit} />
    </div>
  );
}
