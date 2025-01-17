'use client';

import { PasswordResetRequestForm } from '@/modules/auth/forms/password-reset-request-form';

export default function PasswordResetRequestPage() {
  async function onSendResetRequest(data) {
    console.log('Password reset', data);
  }

  return <PasswordResetRequestForm isLoading={false} onSubmit={onSendResetRequest} />;
}
