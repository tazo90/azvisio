'use client';

import { SettingsDeleteAccountForm } from '@/modules/dashboard/features/settings/forms/delete-account-form';
import { SettingsGeneralForm } from '@/modules/dashboard/features/settings/forms/general-form';

export default function SettingsGeneralPage() {
  async function onSave(data) {
    console.log('Settings saved', data);
  }

  return (
    <div className="grid gap-6">
      <SettingsGeneralForm isLoading={false} onSubmit={onSave} />

      <SettingsDeleteAccountForm onSubmit={console.log} />
    </div>
  );
}
