import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import clsx from 'clsx';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Button } from './ui/button';

export function DynamicForm({ schema, onSubmit, data = {} }) {
  const form = useForm({ defaultValues: data });

  // Pobieranie opcji dla wszystkich selectów
  const selectFields = schema.rows.flat().filter((field) => field.type === 'select');

  // const selectQueries = selectFields.map((field) =>
  //   useQuery({
  //     queryKey: field.options.queryKey,
  //     queryFn: field.options.queryFn,
  //     select: field.options.transform,
  //   })
  // );

  // Czekamy na załadowanie wszystkich opcji
  // const isLoading = selectQueries.some((query) => query.isLoading);

  // if (isLoading) {
  //   return <div>Loading form options...</div>;
  // }

  // Mapowanie zapytań do pól
  // const fieldOptionsMap = Object.fromEntries(
  //   selectFields.map((field, index) => [field.name, selectQueries[index].data])
  // );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {schema.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-12 gap-4">
            {row.map((field, fieldIndex) => (
              <FormField
                key={fieldIndex}
                control={form.control}
                name={field.name}
                className={clsx({
                  'col-span-12': field.width === 'full',
                  'col-span-6': field.width === '1/2',
                  'col-span-4': field.width === '1/3',
                  'col-span-3': field.width === '1/4',
                })}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === 'select' ? (
                        <Select {...field} /> //options={fieldOptionsMap[field.name]} />
                      ) : (
                        <Input {...field} type={field.type} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
