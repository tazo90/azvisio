import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RegisterDonePageProps {
  title: string;
  description: string;
}

export function RegisterDonePage({ title, description }: RegisterDonePageProps) {
  return (
    <Card className="text-center">
      <CardHeader className="text-xl gap-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/login" className={cn('w-1/2', buttonVariants({ variant: 'default', size: 'default' }))}>
          Go to login
        </Link>
      </CardContent>
    </Card>
  );
}
