import { z } from 'zod';
import { BaseField } from './base-field';

export class CheckboxField extends BaseField {
  constructor(name: string) {
    super(name);
    this.config.type = 'checkbox';
  }

  getSchema() {
    return z.boolean();
  }

  getConfig() {
    return this.config;
  }
}
