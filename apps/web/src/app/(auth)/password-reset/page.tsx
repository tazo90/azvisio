'use client';

import { PasswordResetPage } from '@/modules/auth/pages/password-reset';

export default function AuthPasswordResetPage() {
  async function onPasswordReset(data) {
    console.log('Password reset', data);
  }

  return <PasswordResetPage isLoading={false} onPasswordReset={onPasswordReset} />;
}
