'use client';

import { RegisterPage } from '@/modules/auth/pages/register';

export default function AuthRegisterPage() {
  async function onSignUp(data) {
    console.log('SIGN UP', data);
  }

  return <RegisterPage isLoading={false} onSignUp={onSignUp} />;
}
