import { cn } from '@/lib/utils';
import { f } from '@/lib/forms/form-builder';
import { Form } from '@/components/form';
import { FormProps } from '@/types';

const passwordResetRequestForm = f
  .fields(f.row(f.text('email').label('Email').placeholder('m@example.com')))
  .title('Reset password')
  .description("Provide your account's email address, and we will send you instructions to reset your password.")
  .submit('Send reset instructions');

export function PasswordResetRequestForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={passwordResetRequestForm} onSubmit={onSubmit} />
    </div>
  );
}
