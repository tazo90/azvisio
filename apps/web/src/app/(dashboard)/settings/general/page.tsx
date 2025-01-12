'use client';

import { Button } from '@/components/ui/button';
import { f } from '@/lib/forms/form-builder';
import { t } from '@/lib/forms/tabs-builder';
import { SettingsDeleteAccountForm } from '@/modules/dashboard/features/settings/forms/delete-account-form';
import { SettingsGeneralForm } from '@/modules/dashboard/features/settings/forms/general-form';
import { useSheetStore } from '@/stores/use-sheet-store';
import { BellIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';

const demoForm = f
  .fields(
    f
      .text('abc')
      .label('Abc')
      .description('This is the name that will be displayed on your profile and in emails.')
      .tooltip('This is the name that will be displayed on your profile and in emails.')
      .required(),
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
      .defaultValue(new Date()),
    f.textarea('bio').label('Biography').placeholder('Tell us about yourself').rows(4).maxLength(500).required(),
    f.textarea('notes').label('Additional notes').placeholder('Any additional information').resize(false).rows(2)
  )

  .title('Demo form', 'left')
  .description('Demo form desc');

const demoForm2 = f
  .fields(f.row(f.text('first_name').label('First name').required(), f.text('last_name').label('Last name')))
  .title('Demo form', 'left')
  .description('Demo form desc');

const demoForm3 = f
  .fields(
    f.section(
      'Personal Information',
      'Enter your personal details',
      f.text('first_name').label('First name').required(),
      f.text('last_name').label('Last name').required()
    ),
    f.section(
      'Contact Information',
      'How can we reach you?',
      f.text('email').label('Email').email().required(),
      f.text('phone').label('Phone')
    ),
    f.section(
      'Preferences',
      // 'This is description',
      f.switch('notifications').label('Enable notifications'),
      f
        .select('theme', [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ])
        .label('Theme')
    )
  )
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

const verticalForm = f
  .fields(f.text('name').label('Name').required(), f.text('email').label('Email'))
  .layout('vertical');

const horizontalForm = f
  .fields(
    f
      .text('name')
      .label('Name')
      .required()
      .tooltip('This is a tooltip')
      .description(
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MailIcon className="h-3 w-3" />
          <span>We'll never share your email</span>
        </div>
      ),
    f
      .text('email')
      .label('Email')
      .description(
        <a href="#" className="text-[0.8rem] text-blue-500">
          Create new
        </a>
      ),
    f.section(
      'Preferences',
      <p className="text-xs text-gray-800 px-2 py-1 w-3/4 rounded-sm bg-blue-100">Validation permissions...</p>,
      f.switch('notifications').label('Enable notifications'),
      f
        .select('theme', [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ])
        .label('Theme')
    )
  )
  .layout('horizontal', '1/3', '2/3');

const userSheet = f
  .sheet({ width: 'full' })
  .title('User profile')
  .description('Manage user profile')
  .content(
    t
      .tabs('tabs') // 'sections'
      .orientation('vertical') // 'horizontal'
      .fullWidth(false)
      .className('gap-x-6')
      .tab('Profile', demoForm2, {
        description: 'Manage your personal information',
        icon: <UserIcon className="w-4 h-4" />,
      })
      .tab('Security', demoForm, {
        description: 'Update your security settings',
        icon: <LockIcon className="w-4 h-4" />,
      })
      .tab('Notifications', demoForm3, {
        description: 'Configure notification preferences',
        icon: <BellIcon className="w-4 h-4" />,
        // disabled: true, //
      })
      .tab('Vertical Form', verticalForm, {
        description: 'Vertical form',
        icon: <BellIcon className="w-4 h-4" />,
      })
      .tab('Horizontal Form', horizontalForm, {
        description: 'Horizontal form',
        icon: <BellIcon className="w-4 h-4" />,
      })
  )
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
