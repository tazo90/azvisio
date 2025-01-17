import { cn } from '@/lib/utils';
import { FormTheme } from '../types';
import { defaultTheme } from '../themes/default';

export function useFormTheme(theme: FormTheme = defaultTheme) {
  function getFieldStyles(type: string, state: { isError?: boolean; isDisabled?: boolean; size?: 'sm' | 'md' | 'lg' }) {
    return cn(
      theme.components[type].base,
      state.isError && theme.components[type].error,
      state.isDisabled && theme.components[type].disabled
    );
  }

  return { theme, getFieldStyles };
}
