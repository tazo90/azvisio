import { BaseField } from './fields';

export type Width = 'full' | '1/2' | '1/3' | '1/4';
export type Align = 'center' | 'left' | 'right';

export interface FormSection {
  type: 'section';
  title: string;
  description?: string;
  fields: Row[]; // możemy mieć wiele rows w sekcji
}

export interface FormConfig {
  rows: Row[] | FormSection[];
  _title?: {
    text: string;
    align: Align;
  };
  _description?: string;
  _submit: SubmitConfig;
  _header?: React.ReactNode | null;
  _footer?: React.ReactNode | null;
  _width?: string;
  _confirmDialog?: {
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel?: string;
  };
  _action?: {
    form: FormConfig;
  };
}

export interface ActionConfig {
  form: FormConfig;
  // type?: 'sheet' | 'modal' | 'popover';
  // width?: string;
}

export interface SubmitConfig {
  label: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

export interface Row {
  fields: BaseField[];
}
