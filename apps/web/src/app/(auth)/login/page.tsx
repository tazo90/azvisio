'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '@/modules/auth/forms/login-form';
import { useResource } from '@/hooks/use-resource';
import { api } from '@/api/resources';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/modules/auth/services/auth-service';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const login = useResource(api.auth, 'login', {
    onSuccess: async (data) => {
      try {
        const { accessToken, refreshToken } = data;
        await authService.login({ accessToken, refreshToken }, data.user);

        // Redirect on returnUrl or dashboard
        const returnUrl = searchParams.get('returnUrl') || '/dashboard';
        router.replace(returnUrl);
      } catch (error) {
        toast.error('Error starting session');
      }
    },
    onError: (error) => {
      toast.error('Unauthorized', error);
    },
  });

  return <LoginForm onSubmit={login} />;
}
