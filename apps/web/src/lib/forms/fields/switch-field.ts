import { z } from 'zod';
import { BaseField } from './base-field';

export class SwitchField extends BaseField {
  constructor(name: string) {
    super(name);
    this.config.type = 'switch';
  }

  getSchema() {
    return z.boolean();
  }

  getConfig() {
    return this.config;
  }
}
