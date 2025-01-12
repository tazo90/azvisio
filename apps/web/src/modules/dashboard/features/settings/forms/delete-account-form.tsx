import { cn } from '@/lib/utils';
import { Form } from '@/lib/fantom/components/form';
import { FormProps } from '@/types';
import { f } from '@/lib/fantom';

const deleteConfirmationForm = f
  .fields(
    f.row(f.text('password').label('Password').required()),
    f.row(f.text('confirmation_text').label('Type "DELETE" to confirm').required())
  )
  .submit('Delete Account', 'destructive')
  .title('Confirm account deletion', 'left')
  .description('Please type your password and confirm you want to delete this account');

const demoForm = f
  .fields(
    f.row(f.text('first_name').label('First name').required()),
    f.row(f.text('last_name').label('Last name').required()),
    f
      .select('country', [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Poland', value: 'pl' },
      ])
      .label('Country')
      .required()
      .defaultValue('pl')
  )
  // .submit('Delete Account', 'destructive')
  .title('Demo form', 'left')
  .description('Demo form desc');

const userSettingsSheet = f
  .sheet({ width: 'md' })
  .title('User Settings')
  .description('Manage your account settings')
  .content(
    // deleteConfirmationForm,
    f
      .tabs()
      .tab('Profile', deleteConfirmationForm)
      .tab('Foo', f.fields(f.row(f.text('name').label('Name')), f.row(f.text('email').label('Email'))))
      .tab('Demo form', demoForm)
  )
  .footer({
    submitLabel: 'Save',
  });

const settingsDeleteAccountForm = f
  .fields()
  .title('Delete account', 'left')
  .description(
    'If you want to permanently delete this workspace and all of its data, including but not limited to users, issues, and comments, you can do so below.'
  )
  .submit('Delete', 'destructive', 'w-1/4')
  .action({
    sheet: userSettingsSheet,
  });

export function SettingsDeleteAccountForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={settingsDeleteAccountForm} onSubmit={onSubmit} />
    </div>
  );
}
