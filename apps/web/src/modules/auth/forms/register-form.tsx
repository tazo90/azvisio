import { cn } from '@/lib/utils';
import { f, Form, FormProps } from '@/lib/fantom';
import Link from 'next/link';

const registerForm = f
  .fields(
    f.row(f.text('email').label('Email').placeholder('m@example.com').required()),
    f.row(f.text('password').label('Password').password().required())
  )
  .title('Create a AzVisio account')
  .description('Sign up with your email address')
  .footer(
    <div className="text-center text-sm">
      Already have an account?{' '}
      <Link href="login" className="underline underline-offset-4">
        Sign in
      </Link>
    </div>
  )
  .submit('Register')
  .theme('modern');

export function RegisterForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={registerForm} onSubmit={onSubmit} />
    </div>
  );
}
