import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { FormLabel } from '@/components/ui/form';

export function BaseFieldComponent({ beforeContent, required, label, tooltip, description }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <FormLabel>{label}</FormLabel>
        {beforeContent}
        {required && <span className="text-red-500">*</span>}
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
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </>
  );
}
