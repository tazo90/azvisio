import { FormConfig } from './types';

type TabMode = 'tabs' | 'sections';

interface TabConfig {
  label: string;
  content: React.ReactNode | FormConfig;
}

export interface TabsConfig {
  tabs: TabConfig[];
  mode: TabMode;
}

export class TabsBuilder {
  private tabs: TabConfig[] = [];
  private mode: TabMode;

  constructor(mode: TabMode = 'tabs') {
    this.mode = mode;
  }

  tab(label: string, content: TabConfig['content']) {
    this.tabs.push({ label, content });
    return this;
  }

  getConfig(): TabsConfig {
    return {
      tabs: this.tabs,
      mode: this.mode,
    };
  }
}
export const t = {
  tabs: (mode?: TabMode) => new TabsBuilder(mode),
};
