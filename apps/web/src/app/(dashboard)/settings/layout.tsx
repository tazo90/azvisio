'use client';

import React from 'react';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex p-4 max-w-screen-xl">{children}</div>;
}
