import { Search } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { SidebarGroup, SidebarGroupContent, SidebarInput } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { modernTheme } from '@/lib/fantom/themes/modern';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search..."
            className={cn(modernTheme.components.input.base, 'bg-white pl-8 h-9')}
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
