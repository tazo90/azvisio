'use client';

import { useState } from 'react';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginPage } from '@/modules/auth/pages/login';

export default function AuthLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data) {
    setIsLoading(true);

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

  return <LoginPage isLoading={isLoading} onSubmit={onSubmit} />;
}
