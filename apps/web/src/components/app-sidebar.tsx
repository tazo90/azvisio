'use client';

import * as React from 'react';
import {
  AppWindowMac,
  AudioWaveform,
  Box,
  Command,
  Frame,
  GalleryVerticalEnd,
  Gauge,
  HandCoins,
  Map,
  PieChart,
  Settings2,
  SquareDashedMousePointer,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { StorageCard } from './storage-card';
import { SearchForm } from './search-form';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Gauge,
      isActive: true,
    },
    {
      title: 'Architecture',
      url: '#',
      icon: SquareDashedMousePointer,
      items: [
        {
          title: 'New Design',
          url: '#',
        },
        {
          title: 'Import Resources',
          url: '#',
        },
        {
          title: 'Bicep Files',
          url: '#',
        },
        {
          title: 'Deployments',
          url: '#',
        },
        {
          title: 'Costs & Estimation',
          url: '#',
        },
      ],
    },
    {
      title: 'Projects',
      url: '#',
      icon: AppWindowMac,
      items: [
        {
          title: 'My Projects',
          url: '#',
        },
        {
          title: 'Shared Projects',
          url: '#',
        },
      ],
    },
    {
      title: 'Resources',
      url: '#',
      icon: Box,
      items: [
        {
          title: 'All',
          url: '#',
        },
        {
          title: 'Compute',
          url: '#',
        },
        {
          title: 'Networking',
          url: '#',
        },
        {
          title: 'Storage',
          url: '#',
        },
        {
          title: 'Databases',
          url: '#',
        },
        {
          title: 'Identity and Security',
          url: '#',
        },
        {
          title: 'Containers',
          url: '#',
        },
        {
          title: 'Web and Mobile',
          url: '#',
        },
        {
          title: 'Analytics and AI',
          url: '#',
        },
        {
          title: 'Monitoring and Management',
          url: '#',
        },
        {
          title: 'Developer Tools',
          url: '#',
        },
        {
          title: 'IoT',
          url: '#',
        },
        {
          title: 'Migration',
          url: '#',
        },
      ],
    },
    {
      title: 'Costs',
      url: '#',
      icon: HandCoins,
      items: [
        {
          title: 'Estimation',
          url: '#',
        },
        {
          title: 'Usage',
          url: '#',
        },
        {
          title: 'Budgets',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '/settings/general',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <SearchForm className="mt-2" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <StorageCard />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
