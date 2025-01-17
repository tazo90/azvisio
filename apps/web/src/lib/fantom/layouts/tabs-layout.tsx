import { Form } from '@/lib/fantom/components/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { TabsConfig } from '../builders/tabs-builder';
import { FormConfig } from '../types';
import { cn } from '../../utils';

interface TabsLayoutProps {
  config: TabsConfig;
  onSubmit: (data: any) => void;
}

export const TabsLayout = ({ config, onSubmit, asSheet }: TabsLayoutProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (config._mode === 'sections') {
    const containerClasses = cn('space-y-6', config._orientation === 'vertical' && 'flex gap-x-6', config._className);

    return (
      <div className={containerClasses}>
        {config._orientation === 'vertical' && (
          <div className="w-1/4 space-y-1">
            {config._tabs.map((tab) => (
              <div
                key={tab.label}
                className={cn('rounded-md p-3 hover:bg-muted', tab.disabled && 'opacity-50 cursor-not-allowed')}
              >
                <div className="flex items-center gap-3">
                  {tab.icon}
                  <div>
                    <h3 className="font-medium">{tab.label}</h3>
                    {tab.description && <p className="text-sm text-muted-foreground">{tab.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={cn(config._orientation === 'vertical' && 'flex-1')}>
          {config._tabs.map(
            (tab) =>
              !tab.disabled && (
                <div key={tab.label} className="space-y-4">
                  {config._orientation === 'horizontal' && (
                    <div className="pb-2 border-b">
                      <div className="flex items-center gap-3">
                        {tab.icon}
                        <div>
                          <h2 className="text-lg font-semibold">{tab.label}</h2>
                          {tab.description && <p className="text-sm text-muted-foreground">{tab.description}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  {React.isValidElement(tab.content) ? (
                    tab.content
                  ) : (
                    <Form asSheet form={tab.content as FormConfig} onSubmit={onSubmit} />
                  )}
                </div>
              )
          )}
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue={config._tabs[0]?.label} className={cn('w-full', config._className)}>
      <TabsList className={cn(config._fullWidth && 'grid', config._fullWidth && `grid-cols-${config._tabs.length}`)}>
        {config._tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label} disabled={tab.disabled} className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {config._tabs.map(
        (tab) =>
          !tab.disabled && (
            <TabsContent key={tab.label} value={tab.label}>
              {tab.description && <p className="text-sm text-muted-foreground mb-4">{tab.description}</p>}
              {React.isValidElement(tab.content) ? (
                tab.content
              ) : (
                <Form asSheet form={tab.content as FormConfig} onSubmit={onSubmit} />
              )}
            </TabsContent>
          )
      )}
    </Tabs>
  );
};
