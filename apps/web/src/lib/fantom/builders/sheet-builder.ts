import { TabsConfig } from './tabs-builder';
import { FormConfig } from '../types';

export interface SheetConfig {
  _title: string;
  _description?: string;
  _content: React.ReactNode | FormConfig | TabsConfig;
  _footer?: {
    submitLabel?: string;
    cancelLabel?: string;
    // variant?: ButtonVariant;
  };
  _width?: string;
}

interface SheetOpts {
  width: 'sm' | 'md' | 'lg' | 'xl' | '3xl' | 'full' | 'string';
}

export const sheet = (opts?: SheetOpts) => {
  const config: SheetConfig = {
    _title: '',
    _description: '',
    _content: null,
    _footer: {
      submitLabel: 'Save',
      cancelLabel: 'Cancel',
      // variant: 'default',
    },
    _width: opts?.width || 'sm',
  };

  return {
    ...config,
    title(text: string) {
      this._title = text;
      return this;
    },
    description(text: string) {
      this._description = text;
      return this;
    },
    content(content: SheetConfig['content']) {
      this._content = content;
      return this;
    },
    footer(config: SheetConfig['footer']) {
      this._footer = { ...this.footer, ...config };
      return this;
    },
  };
};
