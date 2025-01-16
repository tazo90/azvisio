export const defaultTheme = {
  name: 'Default Theme',
  components: {
    input: {
      base: 'h-6 rounded-none border bg-background px-2',
      focus: 'ring-2 ring-primary',
      error: 'border-destructive',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    select: {
      base: 'h-6 rounded-none border border-gray-500 bg-background px-2',
      focus: 'ring-2 ring-primary',
      error: 'border-destructive',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    label: {
      base: 'text-xs font-medium',
      required: 'text-destructive font-semibold',
      error: 'text-destructive',
      disabled: 'opacity-50',
    },
  },
  layout: {
    spacing: 'space-y-4',
    padding: 'p-4',
    borderRadius: 'rounded-lg',
  },
  typography: {
    label: 'text-xs font-medium',
    input: 'text-base',
    helper: 'text-xs text-muted-foreground',
    error: 'text-xs text-destructive',
  },
};
