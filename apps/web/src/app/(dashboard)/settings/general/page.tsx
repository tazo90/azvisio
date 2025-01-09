'use client';

import { Button } from '@/components/ui/button';
import { f } from '@/lib/forms/form-builder';
import { SettingsDeleteAccountForm } from '@/modules/dashboard/features/settings/forms/delete-account-form';
import { SettingsGeneralForm } from '@/modules/dashboard/features/settings/forms/general-form';
import { useSheetStore } from '@/stores/use-sheet-store';

const demoForm = f
  .fields(
    f.text('abc').label('Abc').required(),
    f.text('cdf').label('CDE'),
    f
      .select('country', [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Poland', value: 'pl' },
      ])
      .label('Country')
      .required()
      .defaultValue('us'),
    f.checkbox('terms').label('I accept the terms and conditions').required().defaultChecked(false),
    f.checkbox('newsletter').label('Subscribe to newsletter').defaultChecked(true),
    f
      .radio('gender', [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ])
      .label('Gender')
      .required()
      .defaultValue('male')
      .layout('vertical'),
    f
      .switch('notifications')
      .label('Enable notifications')
      .description('Get notified when someone messages you')
      .defaultChecked(true),
    f
      .switch('marketing')
      .label('Marketing emails')
      .description('Receive emails about new products')
      .defaultChecked(false),
    f
      .date('birthDate')
      .label('Date of birth')
      .required()
      .min(new Date('1900-01-01'))
      .max(new Date())
      .placeholder('Select your birth date'),

    f
      .date('appointmentDate')
      .label('Appointment date')
      .min(new Date())
      .disabledDates([
        new Date('2024-01-01'), // holidays
        new Date('2024-12-25'),
      ])
      .defaultValue(new Date())
  )

  .title('Demo form', 'left')
  .description('Demo form desc');

const demoForm2 = f
  .fields(f.row(f.text('first_name').label('First name').required(), f.text('last_name').label('Last name')))
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
  .sheet({ width: 'full' })
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
