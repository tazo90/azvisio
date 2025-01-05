import { FormConfig } from './form-builder';

interface TabConfig {
  label: string;
  content: React.ReactNode | FormConfig;
}

export interface TabsConfig {
  tabs: TabConfig[];
}

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

// tabs-builder.ts
export class TabsBuilder {
  private _tabs: TabConfig[] = [];

  tab(label: string, content: TabConfig['content']) {
    this._tabs.push({ label, content });
    return this;
  }

  getConfig(): TabsConfig {
    return {
      tabs: this._tabs,
    };
  }
}

export const t = {
  tabs: () => new TabsBuilder(),
};
