import { z } from 'zod';
import { BaseField, BaseFieldConfig } from './base-field';

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  defaultChecked?: boolean;
}

export class CheckboxField extends BaseField {
  private _defaultChecked: boolean = false;

  constructor(name: string) {
    super(name);
    this.config.type = 'checkbox';
  }

  defaultChecked(checked: boolean = true) {
    this._defaultChecked = checked;
    return this;
  }

  getSchema() {
    let schema = z.boolean();

    if (this.config.required) {
      schema = schema.refine((val) => val === true, {
        message: 'This field must be checked',
      });
    }

    return schema;
  }

  getConfig(): CheckboxFieldConfig {
    return {
      ...this.config,
      type: 'checkbox',
      defaultChecked: this._defaultChecked,
    };
  }
}
