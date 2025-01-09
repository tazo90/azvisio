import { z } from 'zod';
import { BaseField } from './base-field';

export class TextField extends BaseField {
  private _isEmail = false;
  private _isNumber = false;
  private _min?: number;
  private _max?: number;

  constructor(name: string) {
    super(name);
    this.config.type = 'text';
  }

  email() {
    this._isEmail = true;
    return this;
  }

  number() {
    this._isNumber = true;
    return this;
  }

  min(value: number) {
    this._min = value;
  }

  max(value: number) {
    this._max = value;
  }

  getSchema() {
    let schema = this._isEmail ? z.string().email() : z.string();
    if (this._min) schema = schema.min(this._min);
    if (this._max) schema = schema.max(this._max);

    return schema;
  }

  getConfig() {
    return {
      ...this.config,
      isEmail: this._isEmail,
      isNumber: this._isNumber,
    };
  }
}
