'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterPage } from '@/modules/auth/pages/register';

export default function AuthRegisterPage() {
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

  return <RegisterPage isLoading={isLoading} onSubmit={onSubmit} />;
}
