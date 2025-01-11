import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { FormLabel } from '@/components/ui/form';

export function BaseFieldComponent({ beforeContent, required, label, tooltip, description }) {
  return (
    <>
      <div className="flex items-center gap-1">
        <FormLabel className="text-xs">{label}</FormLabel>
        {beforeContent}
        {required && <span className="font-semibold text-destructive">*</span>}
        {tooltip && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </>
  );
}
