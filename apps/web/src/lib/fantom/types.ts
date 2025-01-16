import { BaseField } from './fields';

export type Width = 'full' | '1/2' | '1/3' | '1/4';
export type Align = 'center' | 'left' | 'right';

export type FormLayout = 'vertical' | 'horizontal';

export interface FormSection {
  type: 'section';
  title: string;
  description?: string | React.ReactNode;
  fields: Row[]; // can have multiple rows in section
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
  _layout?: {
    type: FormLayout;
    labelWidth?: string; // e.g '1/3', '1/4'
    controlWidth?: string;
  };
  _theme?: FormTheme;
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

export interface FormTheme {
  name: string;
  components: {
    input: {
      base: string;
      focus: string;
      error: string;
      disabled: string;
    };
    select: {
      base: string;
      focus: string;
      error: string;
      disabled: string;
    };
    label: {
      base: string;
      required: string;
      error: string;
      disabled: string;
    };
  };
  layout: {
    spacing: string;
    padding: string;
    borderRadius: string;
  };
  typography: {
    label: string;
    input: string;
    helper: string;
    error: string;
  };
}
