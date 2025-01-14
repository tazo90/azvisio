'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SheetRoot } from '@/lib/fantom/components/sheet-root';

import { Separator } from '@/components/ui/separator';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';
import { ProtectedRoute } from '@/modules/auth/components/protected-route';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isPageSidebar = true;

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <div className="flex w-auto">
            {/* <PageSidebar /> */}

            <div className={cn('flex flex-col w-full', isPageSidebar && 'border-l')}>
              <header className="flex h-10 shrink-0 items-center gap-2 border-b w-full transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumbs />
                </div>
              </header>
              <div className="relative flex flex-1 flex-col gap-4 p-4">
                {children}
                <SheetRoot />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
