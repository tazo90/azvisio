import { useForm } from 'react-hook-form';
import {
  Form as BaseForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import clsx from 'clsx';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { SheetLayout } from '../layouts/sheet-layout';
import {
  CheckboxFieldComponent,
  DateFieldComponent,
  RadioFieldComponent,
  SelectFieldComponent,
  SwitchFieldComponent,
  TextFieldComponent,
} from './fields';
import { TextareaFieldComponent } from './fields/textarea';
import { GridLayout } from '../layouts/grid-layout';
import { getSheetWidth } from '../utils/get-sheet-width';

const fieldComponents = {
  text: TextFieldComponent,
  select: SelectFieldComponent,
  checkbox: CheckboxFieldComponent,
  date: DateFieldComponent,
  radio: RadioFieldComponent,
  switch: SwitchFieldComponent,
  textarea: TextareaFieldComponent,
};

interface FormProps {
  form: ReturnType<typeof form>;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
}

export const Form = ({ form, asSheet = false, onSubmit, defaultValues = {} }: FormProps) => {
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
    const FieldComponent = fieldComponents[config.type];

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
            <GridLayout
              layout={form._layout}
              label={
                <div className="flex items-center gap-1">
                  <FormLabel className="text-xs">{config.label}</FormLabel>
                  {config.beforeContent}
                  {config.required && <span className="font-semibold text-destructive">*</span>}
                  {config.tooltip && (
                    <div className="pl-2">
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="text-gray-500" style={{ width: '12px', height: '14px' }} />
                          </TooltipTrigger>
                          <TooltipContent className="py-0.5 px-2">{config.tooltip}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              }
              control={
                <div className="space-y-0.5">
                  <FormControl>
                    <FieldComponent {...formField} {...config} />
                  </FormControl>
                  {config.description && typeof config.description === 'string' ? (
                    <p className="text-xs text-muted-foreground">{config.description}</p>
                  ) : (
                    config.description
                  )}
                  {config.afterContent}
                  <FormMessage />
                </div>
              }
            />
          </FormItem>
        )}
      />
    );
  };

  const renderForm = () => {
    return (
      <BaseForm {...methods}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">{form._header && form._header}</div>

          {form.rows.map((item, index) => {
            if ('type' in item && item.type === 'section') {
              return (
                <div key={index} className="space-y-4">
                  <div className="pb-2 border-b">
                    <h3 className="font-medium">{item.title}</h3>
                    {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                  </div>
                  <div className="space-y-4">
                    {item.fields.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-12 gap-4 max-w-2xl">
                        {row.fields.map(renderField)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="grid grid-cols-12 gap-4 max-w-2xl">
                {item.fields.map(renderField)}
              </div>
            );
          })}

          {!asSheet && (
            <Button type="submit" variant={form._submit.variant} className={form._submit.className}>
              {form._submit.label}
            </Button>
          )}

          {form._footer && <div className="mt-4">{form._footer}</div>}
        </form>
      </BaseForm>
    );
  };

  return (
    <>
      {asSheet ? (
        renderForm()
      ) : (
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
          <CardContent className={clsx(form._width)}>{renderForm()}</CardContent>
        </Card>
      )}

      {form._action?.sheet && (
        <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <SheetContent className={cn('h-full p-0', getSheetWidth(form._action?.sheet._width))}>
            <SheetLayout
              config={form._action?.sheet}
              onClose={() => setIsDialogOpen(false)}
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
