import React from 'react';

import { PasswordResetRequestForm } from '../forms/password-reset-request-form';

export function PasswordResetRequestPage({ onSendResetRequest }) {
  return <PasswordResetRequestForm onSubmit={onSendResetRequest} />;
}
