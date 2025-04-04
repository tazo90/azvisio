import { z } from 'zod';
import { BaseField, BaseFieldConfig } from './base-field';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: SelectOption[];
  defaultValue?: string;
}

export class SelectField extends BaseField {
  private _options: SelectOption[] = [];
  private _defaultValue?: string;

  constructor(name: string, options: SelectOption[]) {
    super(name);
    this.config.type = 'select';
    this._options = options;
  }

  defaultValue(value: string) {
    this._defaultValue = value;
    return this;
  }

  getSchema() {
    const values = this._options.map((o) => o.value);
    let schema = z.enum(values as [string, ...string[]]);

    // if (this.config.required) {
    //   schema = schema.min(1, 'Required');
    // }

    return schema;
  }

  getConfig(): SelectFieldConfig {
    return {
      ...this.config,
      type: 'select',
      options: this._options,
      defaultValue: this._defaultValue,
    };
  }
}
