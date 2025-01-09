import { Option } from '../types';
import { BaseField } from './base-field';
import { z } from 'zod';

export class RadioField extends BaseField {
  private _options: Option[] = [];

  constructor(name: string, options: Option[]) {
    super(name);
    this.config.type = 'radio';
    this._options = options;
  }

  getSchema() {
    const values = this._options.map((o) => o.value);
    return z.enum(values as [string, ...string[]]);
  }

  getConfig() {
    return {
      ...this.config,
      options: this._options,
    };
  }
}
