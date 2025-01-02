'use client';

import { PasswordResetForm } from '@/modules/auth/forms/password-reset-form';

export default function PasswordResetPage() {
  async function onPasswordReset(data) {
    console.log('Password reset', data);
  }

  return <PasswordResetForm isLoading={false} onSubmit={onPasswordReset} />;
}
