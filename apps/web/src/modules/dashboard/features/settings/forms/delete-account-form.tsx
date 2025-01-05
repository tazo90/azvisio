import { cn } from '@/lib/utils';
import { f } from '@/lib/forms/form-builder';
import { Form } from '@/components/form';
import { FormProps } from '@/types';
import { t } from '@/lib/forms/tabs-builder';

// f.form
// f.drawer

// 1. formularz to formularz wyswietlajacy w card
// 2. drawer to formularz lub cokolwiek innego nie wyswietlajacy sie w karcie
// ma taki sam layout header, content i footer (active, anuluj)

const deleteConfirmationForm = f
  .fields(
    f.row(f.text('password').label('Password').required()),
    f.row(
      f.text('confirmation_text').label('Type "DELETE" to confirm').required()
      //  .validation(['pattern:DELETE'])
    )
    // f.row(f.checkbox('confirm').label('I understand this action cannot be undone').required())
  )
  .submit('Delete Account', 'destructive')
  .title('Confirm account deletion', 'left')
  .description('Please type your password and confirm you want to delete this account');

const userSettingsSheet = f
  .sheet()
  .title('User Settings')
  .description('Manage your account settings')
  .content(
    // deleteConfirmationForm
    t
      .tabs()
      .tab('Profile', deleteConfirmationForm)
      .tab('Demo', f.fields(f.row(f.text('name').label('Name')), f.row(f.text('email').label('Email'))))

    // f.row(f.text('password').label('Password').required())
    // t
    //   .tabs()
    //   .tab('Profile', f.fields(f.row(f.text('name').label('Name')), f.row(f.text('email').label('Email'))))
    //   .tab('Preferences', f.fields(f.row(f.text('theme').label('Theme')), f.row(f.text('language').label('Language'))))
    //   .tab('New', f.fields(f.row(f.text('adam').label('adam'))))
  )
  .footer({
    submitLabel: 'Save changes',
    variant: 'default',
  });

const settingsDeleteAccountForm = f
  .fields()
  .title('Delete account', 'left')
  .description(
    'If you want to permanently delete this workspace and all of its data, including but not limited to users, issues, and comments, you can do so below.'
  )
  .submit('Delete', 'destructive', 'w-1/4')
  // .confirmDialog({
  //   title: 'Are you absolutely sure?',
  //   description:
  //     'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  //   confirmLabel: 'Yes, delete account',
  //   cancelLabel: 'Cancel',
  // })
  .action({
    sheet: userSettingsSheet,
    // form: deleteConfirmationForm,
  });

export function SettingsDeleteAccountForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={settingsDeleteAccountForm} onSubmit={onSubmit} />
    </div>
  );
}
