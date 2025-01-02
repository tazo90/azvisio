import React from 'react';

import { PasswordResetForm } from '../forms/password-reset-form';

export function PasswordResetPage({ onPasswordReset }) {
  return <PasswordResetForm onSubmit={onPasswordReset} />;
}
