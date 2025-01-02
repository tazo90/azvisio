import { cn } from '@/lib/utils';
import { f } from '@/lib/forms/form-builder';
import { Form } from '@/components/form';

const registerForm = f
  .fields(
    f.row(f.text('email').label('Email').placeholder('m@example.com')),
    f.row(f.text('password').label('Password'))
  )
  .title('Create a AzVisio account')
  .description('Sign up with your email address')
  .submit('Register');

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const handleSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={registerForm} onSubmit={handleSubmit} />
    </div>
  );
}
