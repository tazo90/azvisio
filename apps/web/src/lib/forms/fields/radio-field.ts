import { z } from 'zod';
import { RadioFieldConfig, RadioOption } from '../types';
import { BaseField } from './base-field';

export class RadioField extends BaseField {
  private _options: RadioOption[] = [];
  private _defaultValue?: string;
  private _layout: 'horizontal' | 'vertical' = 'vertical';

  constructor(name: string, options: RadioOption[]) {
    super(name);
    this.config.type = 'radio';
    this._options = options;
  }

  defaultValue(value: string) {
    this._defaultValue = value;
    return this;
  }

  layout(layout: 'horizontal' | 'vertical') {
    this._layout = layout;
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

  getConfig(): RadioFieldConfig {
    return {
      ...this.config,
      type: 'radio',
      options: this._options,
      defaultValue: this._defaultValue,
      layout: this._layout,
    };
  }
}
