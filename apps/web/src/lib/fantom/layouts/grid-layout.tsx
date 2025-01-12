import { cn } from '../../utils';
import { FormLayout } from '../types';

interface LayoutConfig {
  type: FormLayout;
  labelWidth?: string;
  controlWidth?: string;
}

interface GridLayoutProps {
  layout?: LayoutConfig;
  label: React.ReactNode;
  control: React.ReactNode;
}

export function GridLayout({ layout, label, control }: GridLayoutProps) {
  if (layout?.type === 'horizontal') {
    return (
      <div className="flex gap-4">
        <div
          className={cn('flex-none pt-2', {
            'w-1/4': layout.labelWidth === '1/4',
            'w-1/3': layout.labelWidth === '1/3',
            'w-1/2': layout.labelWidth === '1/2',
          })}
        >
          {label}
        </div>
        <div
          className={cn('flex-1', {
            'w-3/4': layout.controlWidth === '3/4',
            'w-2/3': layout.controlWidth === '2/3',
            'w-1/2': layout.controlWidth === '1/2',
          })}
        >
          {control}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {label}
      {control}
    </div>
  );
}
