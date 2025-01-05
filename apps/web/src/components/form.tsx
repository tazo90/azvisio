import { useForm } from 'react-hook-form';
import { Form as BaseForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import clsx from 'clsx';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SheetLayout } from '@/lib/forms/sheet';

interface FormProps {
  form: ReturnType<typeof form>;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
}

export const Form = ({ form, onSubmit, defaultValues = {} }: FormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const methods = useForm({
    // resolver: zodResolver(form.schema),
    defaultValues,
  });

  const handleSubmit = (e: React.FormEvent, data: any) => {
    e.preventDefault();

    if (form._action) {
      setIsDialogOpen(true);
    } else {
      onSubmit(data);
    }
  };

  const renderField = (field) => {
    const config = field.getConfig();

    return (
      <FormField
        key={config.name}
        control={methods.control}
        name={config.name}
        render={({ field: formField }) => (
          <FormItem
            className={clsx({
              'col-span-12': config.width === 'full',
              'col-span-6': config.width === '1/2',
              'col-span-4': config.width === '1/3',
              'col-span-3': config.width === '1/4',
            })}
          >
            <div className="flex items-center gap-2">
              <FormLabel>{config.label}</FormLabel>
              {config.beforeContent}
              {config.required && <span className="text-red-500">*</span>}
              {config.tooltip && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>{config.tooltip}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            {config.description && <p className="text-sm text-gray-500">{config.description}</p>}

            <FormControl>
              <Input {...formField} type={config.type} placeholder={config.placeholder} />
            </FormControl>

            {config.afterContent}

            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  console.log('FORM', form);

  return (
    <>
      <Card>
        <CardHeader
          className={cn(
            form._title?.align === 'center' && 'text-center',
            form._title?.align === 'left' && 'text-left',
            form._title?.align === 'right' && 'text-right'
          )}
        >
          <CardTitle className="text-xl">{form._title?.text}</CardTitle>
          <CardDescription>{form._description}</CardDescription>
        </CardHeader>
        <CardContent className={clsx(form._width)}>
          <BaseForm {...methods}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6">
                {form._header && form._header}
                {form.rows.map((row, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4">
                    {row.fields.map(renderField)}
                  </div>
                ))}
              </div>
              <Button type="submit" variant={form._submit.variant} className={form._submit.className}>
                {form._submit.label}
              </Button>
              {form._footer && <div className="mt-4">{form._footer}</div>}
            </form>
          </BaseForm>
        </CardContent>
      </Card>

      {/* <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <SheetContent>
          <Form form={form._action?.form} onSubmit={() => console.log('ok')} />
        </SheetContent>
      </Sheet> */}
      {form._action?.sheet && (
        <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <SheetContent>
            <SheetLayout
              config={form._action?.sheet}
              onSubmit={(data) => {
                setIsDialogOpen(false);
                onSubmit(data);
              }}
            />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
