'use client';

import { RegisterForm } from '@/modules/auth/forms/register-form';

export default function RegisterPage() {
  async function onSignUp(data) {
    console.log('SIGN UP', data);
  }

  return <RegisterForm isLoading={false} onSubmit={onSignUp} />;
}
