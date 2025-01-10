import { z } from 'zod';
import { BaseField, BaseFieldConfig } from './base-field';

interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
  maxLength?: number;
  resize?: boolean;
}

export class TextareaField extends BaseField {
  private _rows: number = 3;
  private _maxLength?: number;
  private _resize: boolean = true;

  constructor(name: string) {
    super(name);
    this.config.type = 'textarea';
  }

  rows(count: number) {
    this._rows = count;
    return this;
  }

  maxLength(length: number) {
    this._maxLength = length;
    return this;
  }

  resize(allow: boolean = true) {
    this._resize = allow;
    return this;
  }

  getSchema() {
    let schema = z.string();

    if (this.config.required) {
      schema = schema.min(1, 'Required');
    }

    if (this._maxLength) {
      schema = schema.max(this._maxLength, `Must be at most ${this._maxLength} characters`);
    }

    return schema;
  }

  getConfig(): TextareaFieldConfig {
    return {
      ...this.config,
      type: 'textarea',
      rows: this._rows,
      maxLength: this._maxLength,
      resize: this._resize,
    };
  }
}
