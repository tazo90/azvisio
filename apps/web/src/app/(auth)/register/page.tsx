'use client';

import { useResource } from '@/hooks/use-resource';
import { api } from '@/api/resources';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/modules/auth/forms/register-form';
import { RegisterDonePage } from '@/modules/auth/components/register-done-page';
import React from 'react';

export default function RegisterPage() {
  const [email, setEmail] = React.useState('');

  const register = useResource(api.auth, 'register', {
    onSuccess: async (data) => setEmail(data.email),
  });

  if (register.isSuccess) {
    return (
      <RegisterDonePage title="Registration completed" description={`We just send a verification link to ${email}.`} />
    );
  }

  return <RegisterForm onSubmit={register} />;
}
