import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { FormLabel } from '@/components/ui/form';

export function BaseFieldComponent({ beforeContent, required, label, tooltip }) {
  return (
    <>
      <div className="flex items-center gap-1">
        <FormLabel className="text-xs">{label}</FormLabel>
        {beforeContent}
        {required && <span className="font-semibold text-destructive">*</span>}
        {tooltip && (
          <div className="pl-2">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="text-gray-100" style={{ width: '12px', height: '14px' }} />
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </>
  );
}
