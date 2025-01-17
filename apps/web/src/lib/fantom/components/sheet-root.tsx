import { useSheetStore } from '@/stores/use-sheet-store';
import { Sheet, SheetContent } from '../../../components/ui/sheet';
import { cn } from '@/lib/utils';
import { SheetLayout } from '../layouts/sheet-layout';
import { getSheetWidth } from '../utils/get-sheet-width';

export function SheetRoot() {
  const activeSheet = useSheetStore((state) => state.getActiveSheet());
  const closeSheet = useSheetStore((state) => state.closeSheet);

  if (!activeSheet) return null;

  return (
    <Sheet
      modal={false}
      open={activeSheet.isOpen}
      // onOpenChange={(open) => !open && closeSheet(activeSheet.id)}
    >
      <SheetContent
        className={cn('h-full overflow-hidden p-0', getSheetWidth(activeSheet.config._width))}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetLayout
          config={activeSheet.config}
          onSubmit={(data) => {
            activeSheet.config.onSubmit?.(data);
            closeSheet(activeSheet.id);
          }}
          onClose={() => closeSheet(activeSheet.id)}
        />
      </SheetContent>
    </Sheet>
  );
}
