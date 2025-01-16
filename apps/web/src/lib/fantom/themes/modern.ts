export const modernTheme = {
  name: 'Modern Theme',
  components: {
    input: {
      base: 'h-9 text-base rounded-lg border border-gray-300 bg-muted/50 px-4 shadow-sm',
      focus: 'ring-2 ring-offset-2 ring-primary',
      error: 'ring-2 ring-destructive',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    label: {
      base: 'text-sm font-medium',
      required: 'text-destructive',
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
    label: 'text-sm font-medium',
    input: 'text-base',
    helper: 'text-xs text-muted-foreground',
    error: 'text-xs text-destructive',
  },
};
