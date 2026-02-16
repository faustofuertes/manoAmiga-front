import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-faq',
  imports: [TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  faqList = [
    { id: 0, qKey: 'faq.q0', aKey: 'faq.a0', abierta: false },
    { id: 1, qKey: 'faq.q1', aKey: 'faq.a1', abierta: false },
    { id: 2, qKey: 'faq.q2', aKey: 'faq.a2', abierta: false },
    { id: 3, qKey: 'faq.q3', aKey: 'faq.a3', abierta: false },
    { id: 4, qKey: 'faq.q4', aKey: 'faq.a4', abierta: false }
  ];

  constructor(public ts: TranslateService) {}

  toggleOption(num: number) {
    this.faqList[num].abierta = !this.faqList[num].abierta;
  }
}
