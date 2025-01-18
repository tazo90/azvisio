'use client';

import { useResource } from '@/hooks/use-resource';
import { api } from '@/api/resources';
import { RegisterForm } from '@/modules/auth/forms/register-form';
import { AuthInfo } from '@/modules/auth/components/auth-info';
import React from 'react';

export default function RegisterPage() {
  const [email, setEmail] = React.useState('');

  const register = useResource(api.auth, 'register', {
    onSuccess: async (data) => setEmail(data.email),
  });

  if (register.isSuccess) {
    return <AuthInfo title="Registration completed" description={`We just send a verification link to ${email}.`} />;
  }

  return <RegisterForm onSubmit={register} />;
}
