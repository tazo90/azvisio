import { z } from 'zod';
import { BaseField, BaseFieldConfig } from './base-field';

interface DateFieldConfig extends BaseFieldConfig {
  type: 'date';
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}

export class DateField extends BaseField {
  private _defaultValue?: Date;
  private _minDate?: Date;
  private _maxDate?: Date;
  private _disabledDates: Date[] = [];

  constructor(name: string) {
    super(name);
    this.config.type = 'date';
  }

  defaultValue(date: Date) {
    this._defaultValue = date;
    return this;
  }

  min(date: Date) {
    this._minDate = date;
    return this;
  }

  max(date: Date) {
    this._maxDate = date;
    return this;
  }

  disabledDates(dates: Date[]) {
    this._disabledDates = dates;
    return this;
  }

  getSchema() {
    let schema = z.date();

    if (this.config.required) {
      schema = schema.min(new Date('1900-01-01'), 'Invalid date');
    }

    if (this._minDate) {
      schema = schema.min(this._minDate, `Date must be after ${this._minDate.toLocaleDateString()}`);
    }

    if (this._maxDate) {
      schema = schema.max(this._maxDate, `Date must be before ${this._maxDate.toLocaleDateString()}`);
    }

    return schema;
  }

  getConfig(): DateFieldConfig {
    return {
      ...this.config,
      type: 'date',
      defaultValue: this._defaultValue,
      minDate: this._minDate,
      maxDate: this._maxDate,
      disabledDates: this._disabledDates,
    };
  }
}
