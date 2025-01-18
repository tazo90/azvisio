import { cn } from '@/lib/utils';
import { f, Form, FormProps } from '@/lib/fantom';

const passwordResetRequestForm = f
  .fields(f.text('email').label('Email').placeholder('m@example.com'))
  .title('Reset password')
  .description("Provide your account's email address, and we will send you instructions to reset your password.")
  .submit('Send reset instructions')
  .theme('modern');

export function PasswordResetRequestForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={passwordResetRequestForm} onSubmit={onSubmit} />
    </div>
  );
}
