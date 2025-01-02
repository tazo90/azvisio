import { cn } from '@/lib/utils';
import { f } from '@/lib/forms/form-builder';
import { Form } from '@/components/form';
import { FormProps } from '@/types';

const settingsDeleteAccountForm = f
  .fields()
  .title('Delete account')
  .description(
    'If you want to permanently delete this workspace and all of its data, including but not limited to users, issues, and comments, you can do so below.'
  )
  .submit('Delete', 'destructive', 'w-1/3');

export function SettingsDeleteAccountForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={settingsDeleteAccountForm} onSubmit={onSubmit} />
    </div>
  );
}
