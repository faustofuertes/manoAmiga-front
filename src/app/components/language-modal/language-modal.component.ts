import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, Lang } from '../../services/translate.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-language-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './language-modal.component.html',
  styleUrl: './language-modal.component.css'
})
export class LanguageModalComponent {
  @Output() closed = new EventEmitter<void>();

  constructor(public ts: TranslateService) {}

  select(code: Lang): void {
    this.ts.setLang(code);
    this.closed.emit();
  }

  close(): void {
    this.closed.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }
}
