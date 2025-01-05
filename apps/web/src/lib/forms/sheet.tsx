import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TabsLayout } from './tabs';
import { FormConfig } from './form-builder';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/form';
import { TabsBuilder } from './tabs-builder';

interface SheetLayoutProps {
  config: any; //SheetConfig;
  onSubmit: (data: any) => void;
}

export const SheetLayout = ({ config, onSubmit }: SheetLayoutProps) => {
  console.log('CONFIG', config, config._content instanceof TabsBuilder);
  return (
    <div className="flex flex-col h-full">
      <div>
        <SheetHeader>
          <SheetTitle>{config._title}</SheetTitle>
          {config._description && <SheetDescription>{config._description}</SheetDescription>}
        </SheetHeader>

        <div className="flex-1 py-6">
          {config._content instanceof TabsBuilder ? (
            <TabsLayout config={config._content} onSubmit={onSubmit} />
          ) : (
            <Form form={config._content as FormConfig} onSubmit={onSubmit} />
          )}
        </div>
      </div>

      {config.footer && (
        <SheetFooter className="flex sm:justify-start gap-4 mt-auto border-t pt-4">
          <Button variant="ghost">{config._footer.cancelLabel || 'Cancel'}</Button>
          <Button variant={config._footer.variant || 'default'} onClick={() => onSubmit({})}>
            {config._footer.submitLabel || 'Save'}
          </Button>
        </SheetFooter>
      )}
    </div>
  );
};
