'use client';

import { api } from '@/api';
import { useResource } from '@/hooks/use-resource';
import { useToast } from '@/hooks/use-toast';
import { PasswordResetForm } from '@/modules/auth/forms/password-reset-form';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PasswordResetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { toast } = useToast();

  const passwordReset = useResource(api.auth, 'passwordReset', {
    onTransform: (data) => ({ password: data.password, token }),
    onSuccess: async () => {
      toast({
        title: 'Success',
        description: 'Your password has been updated.',
      });
      router.push('/login');
    },
  });

  return <PasswordResetForm onSubmit={passwordReset} />;
}
