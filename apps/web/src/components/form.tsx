import { useForm } from 'react-hook-form';
import { Form as BaseForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import clsx from 'clsx';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface FormProps {
  form: any; //ReturnType<typeof form>;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
}

export const Form = ({ form, onSubmit, defaultValues = {} }: FormProps) => {
  const methods = useForm({
    // resolver: zodResolver(form.schema),
    defaultValues,
  });

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
              {/* {config.tooltip && (
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>{config.tooltip}</TooltipContent>
                </Tooltip>
              )} */}
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
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{form._title}</CardTitle>
          <CardDescription>{form._description}</CardDescription>
        </CardHeader>
        <CardContent>
          <BaseForm {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
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
    </>
  );
};
