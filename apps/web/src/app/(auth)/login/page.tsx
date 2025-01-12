'use client';

import { useState } from 'react';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/modules/auth/forms/login-form';
import { useResource } from '@/hooks/use-resource';
import { api } from '@/api/resources';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const { mutate: login } = useResource(api.auth, 'login');
  const { login, isPending } = useResource(api.auth, 'login', undefined, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  console.log('FET', isPending);

  async function onSignIn(data: any) {
    setIsLoading(true);

    await login(data);

    // const result = await signIn('credentials', {
    //   ...data,
    //   callbackUrl: window.location.origin,
    //   redirect: false,
    // });

    // if (!result?.ok) {
    //   toast.error('Unauthorized', result?.error);
    // } else {
    //   router.push('/dashboard');
    // }

    // setIsLoading(false);
  }

  return <LoginForm isLoading={isLoading} onSubmit={onSignIn} />;
}
