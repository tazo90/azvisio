import { cn } from '@/lib/utils';
import { f } from '@/lib/forms/form-builder';
import { Form } from '@/components/form';
import { FormProps } from '@/types';

const settingsDeleteAccountForm = f
  .fields()
  .title('Delete account', 'left')
  .description(
    'If you want to permanently delete this workspace and all of its data, including but not limited to users, issues, and comments, you can do so below.'
  )
  .submit('Delete', 'destructive', 'w-1/4')
  .confirmDialog({
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    confirmLabel: 'Yes, delete account',
    cancelLabel: 'Cancel',
  });

export function SettingsDeleteAccountForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={settingsDeleteAccountForm} onSubmit={onSubmit} />
    </div>
  );
}
