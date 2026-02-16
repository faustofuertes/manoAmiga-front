import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService, Lang } from './translate.service';

const CACHE_KEY = 'auto_translations';

@Injectable({
  providedIn: 'root'
})
export class AutoTranslateService {
  private cache: Record<string, string> = {};
  private pending = new Set<string>();

  constructor(
    private _http: HttpClient,
    private _ts: TranslateService
  ) {
    this.loadCache();
  }

  /**
   * Returns the translated text if available, otherwise the original text.
   * Triggers a background translation if not yet cached.
   */
  get(text: string): string {
    const lang = this._ts.current;
    if (lang === 'es') return text;

    const key = this.cacheKey(text, lang);
    if (this.cache[key]) return this.cache[key];

    this.fetchTranslation(text, lang);
    return text;
  }

  private cacheKey(text: string, lang: Lang): string {
    const hash = text.substring(0, 60).replace(/\s+/g, '_');
    return `${lang}::${hash}`;
  }

  private fetchTranslation(text: string, lang: Lang): void {
    const key = this.cacheKey(text, lang);
    if (this.pending.has(key)) return;
    this.pending.add(key);

    const targetLang = lang === 'en' ? 'en' : 'pt-BR';
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|${targetLang}`;

    this._http.get<any>(url).subscribe({
      next: (res) => {
        if (res?.responseData?.translatedText) {
          let translated = res.responseData.translatedText as string;
          if (translated.toUpperCase() !== translated) {
            this.cache[key] = translated;
            this.saveCache();
          }
        }
        this.pending.delete(key);
      },
      error: () => {
        this.pending.delete(key);
      }
    });
  }

  private loadCache(): void {
    try {
      const stored = localStorage.getItem(CACHE_KEY);
      if (stored) this.cache = JSON.parse(stored);
    } catch {
      this.cache = {};
    }
  }

  private saveCache(): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
    } catch { }
  }
}
