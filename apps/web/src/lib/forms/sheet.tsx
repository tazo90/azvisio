import { SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TabsLayout } from './tabs';
import { FormConfig } from './form-builder';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/form';
import { TabsBuilder } from './tabs-builder';

interface SheetLayoutProps {
  config: any; //SheetConfig;
  onSubmit: (data: any) => void;
}

export const SheetLayout = ({ config, onSubmit, onClose }: SheetLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 h-full py-4 px-6 ">
        <SheetHeader>
          <SheetClose onClick={onClose} />
          <SheetTitle>{config._title}</SheetTitle>
          {config._description && <SheetDescription>{config._description}</SheetDescription>}
        </SheetHeader>

        <div>
          {config._content instanceof TabsBuilder ? (
            <TabsLayout config={config._content} onSubmit={onSubmit} />
          ) : (
            <Form form={config._content as FormConfig} onSubmit={onSubmit} />
          )}
        </div>
      </div>

      {config.footer && (
        <SheetFooter className="flex sm:justify-start gap-4 mt-auto border-t py-4 px-4">
          <Button variant={config._footer.variant || 'default'} size="sm" onClick={() => onSubmit({})}>
            {config._footer.submitLabel || 'Save'}
          </Button>
          <Button variant="ghost" size="sm">
            {config._footer.cancelLabel || 'Cancel'}
          </Button>
        </SheetFooter>
      )}
    </div>
  );
};
