import { z } from 'zod';
import { BaseField, BaseFieldConfig } from './base-field';

export interface SwitchFieldConfig extends BaseFieldConfig {
  type: 'switch';
  defaultChecked?: boolean;
  description?: string;
}

export class SwitchField extends BaseField {
  private _defaultChecked: boolean = false;

  constructor(name: string) {
    super(name);
    this.config.type = 'switch';
  }

  defaultChecked(checked: boolean = true) {
    this._defaultChecked = checked;
    return this;
  }

  getSchema() {
    let schema = z.boolean();

    if (this.config.required) {
      schema = schema.refine((val) => val === true, {
        message: 'This field must be enabled',
      });
    }

    return schema;
  }

  getConfig(): SwitchFieldConfig {
    return {
      ...this.config,
      type: 'switch',
      defaultChecked: this._defaultChecked,
    };
  }
}
