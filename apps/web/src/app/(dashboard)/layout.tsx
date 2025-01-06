'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SheetRoot } from '@/components/sheet-root';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { PlusCircleIcon } from 'lucide-react';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isPageSidebar = true;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="relative flex flex-1 flex-col gap-4 p-4">
              {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button className="flex h-8" onClick={() => setIsOpen(true)}>
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    Open Drawer
                  </Button>
                </SheetTrigger>

                <SheetContent onInteractOutside={(event) => event.preventDefault()}>
                  <SheetHeader>
                    <SheetClose onClick={() => setIsOpen(false)} />
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet> */}
              {children}
              <SheetRoot />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
