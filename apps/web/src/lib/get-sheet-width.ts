export function getSheetWidth(width: string) {
  if (typeof width === 'string' && !['sm', 'md', 'lg', 'xl', '3xl', 'full'].includes(width)) {
    return width;
  }

  return {
    'sm:max-w-sm': width === 'sm',
    'sm:max-w-md': width === 'md',
    'sm:max-w-lg': width === 'lg',
    'sm:max-w-xl': width === 'xl',
    'sm:max-w-3xl': width === '3xl',
    'sm:max-w-full': width === 'full',
  };
}
