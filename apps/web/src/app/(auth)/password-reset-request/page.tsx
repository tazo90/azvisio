'use client';

import { api } from '@/api';
import { useResource } from '@/hooks/use-resource';
import { AuthInfo } from '@/modules/auth/components/auth-info';
import { PasswordResetRequestForm } from '@/modules/auth/forms/password-reset-request-form';

export default function PasswordResetRequestPage() {
  const passwordRequest = useResource(api.auth, 'passwordRequest');

  if (passwordRequest.isSuccess) {
    return (
      <AuthInfo
        title="Password reset completed"
        description="If the email exists, reset instructions have been sent."
      />
    );
  }

  return <PasswordResetRequestForm onSubmit={passwordRequest} />;
}
