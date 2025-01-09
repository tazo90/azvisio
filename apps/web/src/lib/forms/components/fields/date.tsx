import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DateField } from '../../fields';
import { BaseFieldComponent } from './base';

interface DateFieldComponentProps {
  field: ReturnType<DateField['getConfig']>;
  onChange: (date: Date | undefined) => void;
  value?: Date;
}

export function DateFieldComponent(props: DateFieldComponentProps) {
  const { minDate, maxDate, disabledDates, onChange, value } = props;

  return (
    <>
      <BaseFieldComponent {...props} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            defaultMonth={value}
            disabled={(date) => {
              // Disable dates
              if (disabledDates?.some((disabled) => format(disabled, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))) {
                return true;
              }
              // Min date
              if (minDate && date < minDate) {
                return true;
              }
              // Max date
              if (maxDate && date > maxDate) {
                return true;
              }
              return false;
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
