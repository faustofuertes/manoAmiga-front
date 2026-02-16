import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _current: Theme = 'light';

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') {
      this._current = stored;
      this.apply(stored);
    } else {
      this.apply(this._current);
    }
  }

  get current(): Theme {
    return this._current;
  }

  get isDark(): boolean {
    return this._current === 'dark';
  }

  setTheme(theme: Theme): void {
    if (this._current === theme) return;
    this._current = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    this.apply(theme);
  }

  toggle(): void {
    this.setTheme(this._current === 'dark' ? 'light' : 'dark');
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
