import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslateService } from '../../services/translate.service';

@Component({
  imports: [CommonModule, TranslatePipe],
  selector: 'app-general-reviews',
  templateUrl: './general-reviews.component.html',
  styleUrls: ['./general-reviews.component.css']
})
export class GeneralReviewsComponent implements OnInit, OnDestroy {
  testimonios = [
    {
      nombre: 'Martín Galeano',
      icono: 'assets/images/icons/userMan.webp',
      textoKey: 'review.t0'
    },
    {
      nombre: 'Andrea Molina',
      icono: 'assets/images/icons/userWoman.webp',
      textoKey: 'review.t1'
    },
    {
      nombre: 'Lucas Fernández',
      icono: 'assets/images/icons/userMan.webp',
      textoKey: 'review.t2'
    },
    {
      nombre: 'Pablo Benítez',
      icono: 'assets/images/icons/userMan.webp',
      textoKey: 'review.t3'
    },
    {
      nombre: 'Soledad Rivas',
      icono: 'assets/images/icons/userWoman.webp',
      textoKey: 'review.t4'
    }
  ];

  constructor(public ts: TranslateService) {}

  current = 0;
  intervalId: any;
  isMobile = false;
  progress = 0;
  private progressTimer: any;
  previous = 0;
  slideDirection: 'left' | 'right' = 'right';




  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;

    if (this.isMobile) {
      this.startAutoSlide();
    }
  }



  ngOnDestroy() {
    clearInterval(this.intervalId);
    clearInterval(this.progressTimer);
  }

  startAutoSlide() {
    this.resetProgress();
    this.intervalId = setInterval(() => {
      this.siguiente();
      this.resetProgress();
    }, 4000);

    this.progressTimer = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 2.5; // 100 / (4000ms / 100ms) = 2.5 cada 100ms
      }
    }, 100);
  }


  siguiente() {
    this.slideDirection = 'right';
    this.previous = this.current;
    this.current = (this.current + 1) % this.testimonios.length;
  }

  anterior() {
    this.slideDirection = 'left';
    this.previous = this.current;
    this.current = (this.current - 1 + this.testimonios.length) % this.testimonios.length;
  }


  getClass(index: number): string {
    const total = this.testimonios.length;

    if (index === this.current) return 'active';

    const prevIndex = (this.current - 1 + total) % total;
    const nextIndex = (this.current + 1) % total;

    if (index === prevIndex) return 'prev';
    if (index === nextIndex) return 'next';

    return 'hidden';
  }




  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const isNowMobile = event.target.innerWidth <= 768;

    if (isNowMobile && !this.isMobile) {
      this.isMobile = true;
      this.startAutoSlide();
    } else if (!isNowMobile && this.isMobile) {
      this.isMobile = false;
      clearInterval(this.intervalId);
      clearInterval(this.progressTimer);
      this.progress = 0;
    }
  }

  resetProgress() {
    this.progress = 0;
  }

}
