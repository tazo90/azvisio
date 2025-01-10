import { z } from 'zod';
import { sheet } from './sheet-builder';
import { ActionConfig, Align, FormConfig, Row, SubmitConfig, Width } from './types';
import {
  BaseField,
  CheckboxField,
  DateField,
  RadioField,
  RadioOption,
  SelectField,
  SelectOption,
  SwitchField,
  TextareaField,
  TextField,
} from './fields';

const form = (...items: (BaseField | Row)[]) => {
  const rows = items.map((item) => {
    if ('fields' in item) {
      return item;
    }

    return {
      fields: [item],
    };
  });

  const allFields = rows.flatMap((r) => r.fields);

  const schema = z.object(Object.fromEntries(allFields.map((field) => [field.name, field.getSchema()])));

  const config: FormConfig = {
    rows,
    _title: {
      text: '',
      align: 'center',
    },
    _description: '',
    _submit: {
      label: 'Submit',
      variant: 'default',
      className: 'w-full',
    } as SubmitConfig,
    _header: null,
    _footer: null,
    _width: 'w-2/3',
  };

  return {
    ...config,
    schema,
    title(text: string, align: Align = 'center') {
      this._title = { text, align };
      return this;
    },
    description(text: string) {
      this._description = text;
      return this;
    },
    header(content: React.ReactNode) {
      this._header = content;
      return this;
    },
    footer(content: React.ReactNode) {
      this._footer = content;
      return this;
    },
    submit(label: string, variant?: SubmitConfig['variant'], className?: string) {
      this._submit = {
        ...this._submit,
        label,
        ...(variant && { variant }),
        ...(className && { className }),
      };
      return this;
    },
    width(w: Width) {
      this._width = w;
      return this;
    },
    confirmDialog(config: FormConfig['_confirmDialog']) {
      this._confirmDialog = config;
      return this;
    },
    action(config: ActionConfig) {
      this._action = config;
      return this;
    },
  };
};

const row = (...fields: BaseField[]): Row => ({
  fields,
});

// Form Builder
export const f = {
  // fields
  text: (name: string) => new TextField(name),
  select: (name: string, options: SelectOption[]) => new SelectField(name, options),
  checkbox: (name: string) => new CheckboxField(name),
  radio: (name: string, options: RadioOption[]) => new RadioField(name, options),
  switch: (name: string) => new SwitchField(name),
  date: (name: string) => new DateField(name),
  textarea: (name: string) => new TextareaField(name),

  // methods
  fields: form,
  row,
  //
  sheet,
};
