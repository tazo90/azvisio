import { BaseField } from './fields';

export type FieldType = 'text' | 'select' | 'button' | 'checkbox' | 'date' | 'radio' | 'switch';

export interface BaseFieldConfig {
  name: string;
  type: FieldType;
  width?: Width;
  label?: string;
  placeholder?: string;
  description?: string;
  tooltip?: string;
  required?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: SelectOption[];
  defaultValue?: string;
}

export type Width = 'full' | '1/2' | '1/3' | '1/4';
export type Align = 'center' | 'left' | 'right';

export interface FormConfig {
  rows: Row[];
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

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  defaultChecked?: boolean;
}
