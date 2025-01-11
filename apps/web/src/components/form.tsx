import { useForm } from 'react-hook-form';
import { Form as BaseForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import clsx from 'clsx';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SheetLayout } from '@/lib/forms/sheet';
import { getSheetWidth } from '@/lib/forms/get-sheet-width';
import { DateFieldComponent, SwitchFieldComponent, TextFieldComponent } from '@/lib/forms/components/fields';
import { SelectFieldComponent } from '@/lib/forms/components/fields/select';
import { CheckboxFieldComponent } from '@/lib/forms/components/fields/checkbox';
import { RadioFieldComponent } from '@/lib/forms/components/fields/radio';
import { TextareaFieldComponent } from '@/lib/forms/components/fields/textarea';

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
            <FormControl>
              <FieldComponent {...formField} {...config} />
            </FormControl>

            {config.description && <p className="text-xs text-muted-foreground">{config.description}</p>}

            {config.afterContent}

            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderForm = () => {
    return (
      <BaseForm {...methods}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            {form._header && form._header}
            {/* Check if rows exists */}
            {form.rows?.map((row, index) => (
              <div key={index} className="grid grid-cols-12 gap-4">
                {row.fields.map(renderField)}
              </div>
            ))}
            {/* If form is single field */}
            {form.fields?.map((field) => renderField(field))}
          </div>
          {/* Hide form submit button when form is inside sheet */}
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
