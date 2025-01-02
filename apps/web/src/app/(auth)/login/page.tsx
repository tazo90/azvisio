'use client';

import { useState } from 'react';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/modules/auth/forms/login-form';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSignIn(data: any) {
    setIsLoading(true);

    console.log('LOGIN !!', data);

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
