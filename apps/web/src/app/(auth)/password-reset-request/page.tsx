'use client';

import { PasswordResetRequestPage } from '@/modules/auth/pages/password-reset-request';

export default function AuthPasswordResetRequestPage() {
  async function onSendResetRequest(data) {
    console.log('Password reset', data);
  }

  return <PasswordResetRequestPage isLoading={false} onSendResetRequest={onSendResetRequest} />;
}
