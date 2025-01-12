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
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon, Loader2, XCircleIcon } from 'lucide-react';
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
import { UseMutationResult } from '@tanstack/react-query';
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const fieldComponents = {
  text: TextFieldComponent,
  select: SelectFieldComponent,
  checkbox: CheckboxFieldComponent,
  date: DateFieldComponent,
  radio: RadioFieldComponent,
  switch: SwitchFieldComponent,
  textarea: TextareaFieldComponent,
};

export type FormProps<T = any> = {
  form: ReturnType<typeof form>;
  className?: string;
  asSheet?: boolean;
  onSubmit: UseMutationResult<T> | ((data: any) => Promise<void>);
  defaultValues?: Record<string, any>;
};

type FormError = {
  message: string;
  errors?: Record<string, string[]>;
};

export const Form = ({ form, asSheet = false, onSubmit, defaultValues = {} }: FormProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [apiError, setApiError] = React.useState<FormError | null>(null);

  const methods = useForm({
    // resolver: zodResolver(form.schema),
    defaultValues,
  });

  // Reset API error when form changes
  React.useEffect(() => {
    const subscription = methods.watch(() => {
      if (apiError) {
        setApiError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [methods, apiError]);

  const handleSubmit = methods.handleSubmit((data) => {
    setApiError(null);

    if (form._action) {
      setIsDialogOpen(true);
    } else if ('mutate' in onSubmit) {
      onSubmit.mutate(data, {
        onError: (error: any) => {
          // Let's assume that API error has structure { message, errors }
          if (error.errors) {
            // Set errors on form fields
            Object.entries(error.errors).forEach(([field, messages]) => {
              methods.setError(field, {
                type: 'server',
                message: Array.isArray(messages) ? messages[0] : messages,
              });
            });
          }

          setApiError(error);
        },
      });
    } else {
      onSubmit(data);
    }
  });

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
          {/* General error */}
          {apiError && (
            <Alert variant="destructive" className="rounded-sm">
              <XCircleIcon className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {apiError.response?.data?.message || apiError.message}
              </AlertDescription>
            </Alert>
          )}

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
            <>
              <Button
                type="submit"
                variant={form._submit.variant}
                className={form._submit.className}
                disabled={'mutate' in onSubmit ? onSubmit.isPending : false}
              >
                {form._submit.label}
                {'mutate' in onSubmit && onSubmit.isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
              {/* {'mutate' in onSubmit && onSubmit.isError && !apiError && (
                <p className="text-sm text-destructive">An error occurred. Please try again.</p>
              )} */}
            </>
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
                'mutate' in onSubmit ? onSubmit.mutate(data) : onSubmit(data);
              }}
            />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
