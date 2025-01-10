import { z } from 'zod';
import { BaseFieldConfig, Width } from '../types';
import React from 'react';

export type FieldType = 'text' | 'select' | 'button' | 'checkbox' | 'date' | 'radio' | 'switch' | 'textarea';
export interface BaseFieldConfig {
  name: string;
  type: FieldType;
  width?: Width;
  label?: string;
  placeholder?: string;
  description?: string;
  tooltip?: string;
  required?: boolean;
}

export abstract class BaseField {
  protected config: BaseFieldConfig = {
    name: '',
    type: 'text',
    width: 'full',
    label: '',
    placeholder: '',
    description: '',
    tooltip: '',
    required: false,
  };
  protected beforeContent: React.ReactNode = null;
  protected afterContent: React.ReactNode = null;

  constructor(name: string) {
    this.config.name = name;
  }

  width(w: Width) {
    this.config.width = w;
    return this;
  }

  label(l: string) {
    this.config.label = l;
    return this;
  }

  placeholder(p: string) {
    this.config.placeholder = p;
    return this;
  }

  description(d: string) {
    this.config.description = d;
    return this;
  }

  tooltip(t: string) {
    this.config.tooltip = t;
    return this;
  }

  required() {
    this.config.required = true;
    return this;
  }

  before(content: React.ReactNode) {
    this.beforeContent = content;
    return this;
  }

  after(content: React.ReactNode) {
    this.afterContent = content;
    return this;
  }

  abstract getSchema(): z.ZodType;
  abstract getConfig(): BaseFieldConfig;
}
