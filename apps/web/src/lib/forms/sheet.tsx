import { SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TabsLayout } from './tabs';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/form';
import { TabsBuilder } from './tabs-builder';
import { FormConfig } from './types';

interface SheetLayoutProps {
  config: any; //SheetConfig;
  onSubmit: (data: any) => void;
}

export const SheetLayout = ({ config, onSubmit, onClose }: SheetLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 h-full px-4 py-2">
        <SheetHeader className="py-0">
          <SheetClose onClick={onClose} />
          <SheetTitle>{config._title}</SheetTitle>
          {config._description && <SheetDescription className="text-sm">{config._description}</SheetDescription>}
        </SheetHeader>

        <div className="py-3">
          {config._content instanceof TabsBuilder ? (
            <TabsLayout asSheet config={config._content} onSubmit={onSubmit} />
          ) : (
            <Form asSheet form={config._content as FormConfig} onSubmit={onSubmit} />
          )}
        </div>
      </div>

      {config.footer && (
        <SheetFooter className="flex sm:justify-start gap-4 mt-auto border-t p-4">
          <Button variant={config._footer.variant || 'sheet'} size="sheet" onClick={() => onSubmit({})}>
            {config._footer.submitLabel || 'Save'}
          </Button>
          <Button variant="sheet" size="sheet" onClick={onClose}>
            {config._footer.cancelLabel || 'Cancel'}
          </Button>
        </SheetFooter>
      )}
    </div>
  );
};
