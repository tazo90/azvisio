'use client';

import { useState } from 'react';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/modules/auth/forms/login-form';
import { useResource } from '@/hooks/use-resource';
import { api } from '@/api/resources';

export default function LoginPage() {
  const login = useResource(api.auth, 'login', undefined, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return <LoginForm onSubmit={login} />;
}
