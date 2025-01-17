import { FormConfig } from '../types';

type TabMode = 'tabs' | 'sections';

interface TabConfig {
  label: string;
  content: React.ReactNode | FormConfig;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsConfig {
  tabs: TabConfig[];
  mode: TabMode;
  fullWidth?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export class TabsBuilder {
  private _tabs: TabConfig[] = [];
  private _mode: TabMode;
  private _fullWidth: boolean = true;
  private _orientation: 'horizontal' | 'vertical' = 'horizontal';
  private _className?: string;

  constructor(mode: TabMode = 'tabs') {
    this._mode = mode;
  }

  tab(label: string, content: TabConfig['content'], config?: Partial<TabConfig>) {
    this._tabs.push({
      label,
      content,
      description: config?.description,
      icon: config?.icon,
      disabled: config?.disabled,
    });
    return this;
  }

  fullWidth(enable: boolean = true) {
    this._fullWidth = enable;
    return this;
  }

  orientation(type: 'horizontal' | 'vertical') {
    this._orientation = type;
    return this;
  }

  className(value: string) {
    this._className = value;
    return this;
  }

  getConfig(): TabsConfig {
    return {
      tabs: this._tabs,
      mode: this._mode,
      fullWidth: this._fullWidth,
      orientation: this._orientation,
      className: this._className,
    };
  }
}

export const t = {
  tabs: (mode?: TabMode) => new TabsBuilder(mode),
};
