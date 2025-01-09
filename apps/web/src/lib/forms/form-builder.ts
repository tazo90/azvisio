import { z } from 'zod';
import { sheet } from './sheet-builder';

// Types
type Width = 'full' | '1/2' | '1/3' | '1/4';
type Align = 'center' | 'left' | 'right';

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

interface ActionConfig {
  form: FormConfig;
  // type?: 'sheet' | 'modal' | 'popover';
  // width?: string;
}

interface SubmitConfig {
  label: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

interface Row {
  fields: FieldBuilder[];
}

// Field Builder
class FieldBuilder {
  private _width: Width = 'full';
  private _label = '';
  private _placeholder = '';
  private _description = '';
  private _tooltip = '';
  private _required = false;
  private _isNumber = false;
  private _isEmail = false;
  private _min?: number;
  private _max?: number;
  private _beforeContent?: React.ReactNode;
  private _afterContent?: React.ReactNode;

  constructor(public name: string) {}

  before(content: React.ReactNode) {
    this._beforeContent = content;
    return this;
  }

  after(content: React.ReactNode) {
    this._afterContent = content;
    return this;
  }

  width(w: Width) {
    this._width = w;
    return this;
  }
  label(l: string) {
    this._label = l;
    return this;
  }
  placeholder(p: string) {
    this._placeholder = p;
    return this;
  }
  description(d: string) {
    this._description = d;
    return this;
  }
  tooltip(t: string) {
    this._tooltip = t;
    return this;
  }
  required() {
    this._required = true;
    return this;
  }
  number() {
    this._isNumber = true;
    return this;
  }
  email() {
    this._isEmail = true;
    return this;
  }
  min(m: number) {
    this._min = m;
    return this;
  }
  max(m: number) {
    this._max = m;
    return this;
  }

  getSchema() {
    let schema = this._isNumber ? z.number() : z.string();

    if (this._required) schema = schema.min(1, 'Required');
    if (this._isEmail) schema = z.string().email();
    if (this._min) schema = schema.min(this._min);
    if (this._max) schema = schema.max(this._max);

    return schema;
  }

  getConfig() {
    return {
      name: this.name,
      width: this._width || 'full',
      label: this._label || this.name,
      placeholder: this._placeholder,
      description: this._description,
      tooltip: this._tooltip,
      required: this._required || false,
      type: this._isNumber ? 'number' : this._isEmail ? 'email' : 'text',
      beforeContent: this._beforeContent,
      afterContent: this._afterContent,
    };
  }
}

const form = (...items: (Row | FieldBuilder)[]) => {
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

const row = (...fields: FieldBuilder[]): Row => ({
  fields,
});

// Form Builder
export const f = {
  text: (name: string) => new FieldBuilder(name),
  // core methods
  fields: form,
  row,
  //
  sheet,
};
