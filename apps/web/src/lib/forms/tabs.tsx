import { Form } from '@/components/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormConfig } from './form-builder';
import React from 'react';
import { TabsConfig } from './tabs-builder';

interface TabsLayoutProps {
  config: TabsConfig;
  onSubmit: (data: any) => void;
}

export const TabsLayout = ({ config, onSubmit }: TabsLayoutProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Render tabs only after first component mount
  if (!mounted) {
    return null;
  }

  return (
    <Tabs defaultValue={config._tabs[0]?.label} className="w-full">
      <TabsList>
        {config._tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {config._tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label}>
          {React.isValidElement(tab.content) ? (
            tab.content
          ) : (
            <Form form={tab.content as FormConfig} onSubmit={onSubmit} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
