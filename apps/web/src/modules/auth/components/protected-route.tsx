'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { authService } from '../services/auth-service';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      const returnUrl = searchParams.get('returnUrl') || '/dashboard';
      router.replace(`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
  }, [router, searchParams]);

  if (!authService.isAuthenticated()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
