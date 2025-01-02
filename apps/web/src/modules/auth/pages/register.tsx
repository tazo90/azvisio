import React from 'react';

import { RegisterForm } from '../forms/register-form';

export function RegisterPage({ onSignUp }) {
  return <RegisterForm onSubmit={onSignUp} />;
}
