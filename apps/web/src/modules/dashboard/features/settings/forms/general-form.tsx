import { cn } from '@/lib/utils';
import { f } from '@/lib/forms/form-builder';
import { Form } from '@/components/form';
import { FormProps } from '@/types';

const settingsGeneralForm = f
  .fields(f.row(f.text('full_name').label('Full name')))
  .title('General settings', 'left')
  .description('Update your general account settings')
  .submit('Save', 'default', 'w-1/4');

export function SettingsGeneralForm({ className, onSubmit, ...props }: FormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form form={settingsGeneralForm} onSubmit={onSubmit} />
    </div>
  );
}
