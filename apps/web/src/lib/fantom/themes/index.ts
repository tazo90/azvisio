import { FormTheme } from '../types';
import { defaultTheme } from './default';
import { modernTheme } from './modern';

export const formThemes: Record<string, FormTheme> = {
  default: defaultTheme,
  modern: modernTheme,
};
