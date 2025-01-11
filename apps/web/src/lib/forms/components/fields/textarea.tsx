import { Textarea } from '@/components/ui/textarea';
import { TextareaField } from '../../fields';
import { cn } from '@/lib/utils';

interface TextareaFieldComponentProps {
  field: ReturnType<TextareaField['getConfig']>;
  onChange: (value: string) => void;
  value: string;
}

export function TextareaFieldComponent(props: TextareaFieldComponentProps) {
  const { placeholder, rows, resize, maxLength, onChange, value } = props;

  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={cn('rounded-none', !resize && 'resize-none')}
      />
      {maxLength && (
        <div className="text-xs text-muted-foreground text-right">
          {value?.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
