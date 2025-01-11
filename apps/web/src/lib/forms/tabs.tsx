import { Form } from '@/components/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { TabsConfig } from './tabs-builder';
import { FormConfig } from './types';

interface TabsLayoutProps {
  config: TabsConfig;
  onSubmit: (data: any) => void;
}

export const TabsLayout = ({ config, onSubmit, asSheet }: TabsLayoutProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (config.mode === 'sections') {
    return (
      <div className="space-y-6">
        {config.tabs.map((tab) => (
          <div key={tab.label} className="space-y-2">
            <div className="pb-2">
              <h2 className="text-md font-semibold">{tab.label}</h2>
            </div>
            {React.isValidElement(tab.content) ? (
              tab.content
            ) : (
              <Form asSheet form={tab.content as FormConfig} onSubmit={onSubmit} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Tabs defaultValue={config.tabs[0]?.label} className="w-full">
      <TabsList>
        {config.tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {config.tabs.map((tab) => (
        <TabsContent className="py-3" key={tab.label} value={tab.label}>
          {React.isValidElement(tab.content) ? (
            tab.content
          ) : (
            <Form asSheet form={tab.content as FormConfig} onSubmit={onSubmit} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
