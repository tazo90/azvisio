import { FormConfig } from './form-builder';
import { TabsConfig } from './tabs-builder';

interface SheetConfig {
  _title: string;
  _description?: string;
  _content: React.ReactNode | FormConfig | TabsConfig;
  _footer?: {
    submitLabel?: string;
    cancelLabel?: string;
    // variant?: ButtonVariant;
  };
}

export const sheet = () => {
  const config: SheetConfig = {
    _title: '',
    _description: '',
    _content: null,
    _footer: {
      submitLabel: 'Save',
      cancelLabel: 'Cancel',
      // variant: 'default',
    },
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
