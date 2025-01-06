import { useSheetStore } from '@/stores/use-sheet-store';
import { Sheet, SheetContent } from './ui/sheet';
import { SheetLayout } from '@/lib/forms/sheet';
import { cn } from '@/lib/utils';

export function SheetRoot() {
  const sheets = useSheetStore((state) => state.sheets);
  const closeSheet = useSheetStore((state) => state.closeSheet);

  return (
    <>
      {Object.entries(sheets).map(([id, { config, isOpen }]) => (
        <Sheet key={id} open={isOpen} onOpenChange={(open) => !open && closeSheet(id)}>
          {/* <SheetContent className={cn('h-full p-0', getWidthClass(config.width))}> */}
          <SheetContent className={cn('h-full p-0')}>
            <SheetLayout
              config={config}
              onSubmit={(data) => {
                config.onSubmit?.(data);
                closeSheet(id);
              }}
            />
          </SheetContent>
        </Sheet>
      ))}
    </>
  );
}
