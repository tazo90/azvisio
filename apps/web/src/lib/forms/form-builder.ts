import { z } from 'zod';
import { sheet } from './sheet-builder';
import { ActionConfig, Align, FormConfig, FormLayout, FormSection, Row, SubmitConfig, Width } from './types';
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

const section = (title: string, ...args: (string | BaseField | Row)[]) => {
  // Check if first argument is string (description)
  const hasDescription = typeof args[0] === 'string';
  const description = hasDescription ? args[0] : undefined;
  const fields = hasDescription ? args.slice(1) : args;

  const rows = fields.map((item) => {
    if ('fields' in item) return item;
    return { fields: [item] };
  });

  return {
    type: 'section' as const,
    title,
    description,
    fields: rows,
  };
};
const form = (...items: (BaseField | Row | FormSection)[]) => {
  const extractFields = (items: (BaseField | Row | FormSection)[]): BaseField[] => {
    return items.flatMap((item) => {
      if ('type' in item && item.type === 'section') {
        // If section, then recurrently extract fields from rows
        return item.fields.flatMap((row) => row.fields);
      }
      if ('fields' in item) {
        // If row then return fields
        return item.fields;
      }
      // Single field
      return [item];
    });
  };

  const allFields = extractFields(items);

  const schema = z.object(Object.fromEntries(allFields.map((field) => [field.name, field.getSchema()])));

  const config: FormConfig = {
    rows: items.map((item) => {
      if ('type' in item || 'fields' in item) return item;
      return { fields: [item] };
    }),
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
    layout(type: FormLayout, labelWidth?: string, controlWidth?: string) {
      this._layout = { type, labelWidth, controlWidth };
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
  section,
  //
  sheet,
};
