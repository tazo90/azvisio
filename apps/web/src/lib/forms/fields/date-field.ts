import { z } from 'zod';
import { BaseField } from './base-field';

export class DateField extends BaseField {
  constructor(name: string) {
    super(name);
    this.config.type = 'date';
  }

  getSchema() {
    return z.date();
  }

  getConfig() {
    return this.config;
  }
}
