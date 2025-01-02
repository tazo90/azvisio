import React from 'react';

import { LoginForm } from '../forms/login-form';

export function LoginPage({ onSignIn }) {
  return <LoginForm onSubmit={onSignIn} />;
}
