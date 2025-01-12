import { f as form } from './builders/form-builder';
import { sheet } from './builders/sheet-builder';
import { t as tabs } from './builders/tabs-builder';

export const f = {
  sheet,
  ...form,
  ...tabs,
};
