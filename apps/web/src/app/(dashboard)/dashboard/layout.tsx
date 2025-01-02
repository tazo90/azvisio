'use client';

import { PageSidebar } from '@/components/page-sidebar';

import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-auto">
      <PageSidebar />
      {children}
    </div>
  );
}
