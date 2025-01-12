export function getSheetWidth(width?: string) {
  const widths = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    full: 'sm:max-w-full',
  };

  return width && widths[width] ? widths[width] : width;
}
