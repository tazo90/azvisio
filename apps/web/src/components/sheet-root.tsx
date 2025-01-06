import { useSheetStore } from '@/stores/use-sheet-store';
import { Sheet, SheetContent, SheetOverlay } from './ui/sheet';
import { SheetLayout } from '@/lib/forms/sheet';
import { cn } from '@/lib/utils';

export function SheetRoot() {
  const activeSheet = useSheetStore((state) => state.getActiveSheet());
  const closeSheet = useSheetStore((state) => state.closeSheet);

  if (!activeSheet) return null;

  return (
    <Sheet
      open={activeSheet.isOpen}
      onOpenChange={undefined} // wyłączamy automatyczne zamykanie
    >
      {/* <SheetContent className={cn("h-full p-0", getWidthClass(activeSheet.config.width))}> */}
      {/* <SheetOverlay onClick={(e) => e.stopPropagation()} /> */}
      <SheetContent className={cn('h-full p-0')}>
        <SheetLayout
          config={activeSheet.config}
          onSubmit={(data) => {
            activeSheet.config.onSubmit?.(data);
            closeSheet(activeSheet.id);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
