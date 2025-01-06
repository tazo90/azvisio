'use client';

import { Button } from '@/components/ui/button';
import { f } from '@/lib/forms/form-builder';
import { SettingsDeleteAccountForm } from '@/modules/dashboard/features/settings/forms/delete-account-form';
import { SettingsGeneralForm } from '@/modules/dashboard/features/settings/forms/general-form';
import { useSheetStore } from '@/stores/use-sheet-store';

const demoForm = f
  .fields(
    f.row(f.text('first_name').label('First name').required()),
    f.row(f.text('last_name').label('Last name').required())
  )
  .title('Demo form', 'left')
  .description('Demo form desc');

const demoForm2 = f
  .fields(f.row(f.text('first_name').label('First name').required()))
  .title('Demo form', 'left')
  .description('Demo form desc');

const testSheet = f
  .sheet({ width: 'md' })
  .title('Test Settings')
  .description('Manage your account settings')
  .content(demoForm)
  .footer({
    submitLabel: 'Save',
  });

const userSheet = f
  .sheet({ width: 'md' })
  .title('User profile')
  .description('Manage user profile')
  .content(demoForm2)
  .footer({
    submitLabel: 'Save',
  });

export default function SettingsGeneralPage() {
  const openSheet = useSheetStore((state) => state.openSheet);

  async function onSave(data) {
    console.log('Settings saved', data);
  }

  return (
    <div className="grid gap-6">
      <SettingsGeneralForm isLoading={false} onSubmit={onSave} />

      <SettingsDeleteAccountForm onSubmit={console.log} />

      <Button onClick={() => openSheet('settings', testSheet)}>Settings</Button>

      <Button onClick={() => openSheet('user-profile', userSheet)}>User</Button>
    </div>
  );
}
