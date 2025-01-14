import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { authService } from '../services/auth-service';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    // Check authentication only on client side
    if (!authService.isAuthenticated()) {
      const returnUrl = searchParams.get('returnUrl') || '/dashboard';
      router.replace(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    }

    setIsChecking(false);
  }, [router, searchParams]);

  if (isChecking) {
    // Show loader only during checking auth
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
