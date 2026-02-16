import { Pipe, PipeTransform } from '@angular/core';
import { AutoTranslateService } from '../services/auto-translate.service';

@Pipe({
  name: 'autoTranslate',
  standalone: true,
  pure: false
})
export class AutoTranslatePipe implements PipeTransform {
  constructor(private _ats: AutoTranslateService) {}

  transform(text: string | undefined | null): string {
    if (!text) return '';
    return this._ats.get(text);
  }
}
