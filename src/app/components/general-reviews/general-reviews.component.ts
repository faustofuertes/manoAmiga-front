import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-general-reviews',
  templateUrl: './general-reviews.component.html',
  styleUrls: ['./general-reviews.component.css']
})
export class GeneralReviewsComponent implements OnInit, OnDestroy {
  testimonios = [
    {
      nombre: 'Lucas Pereyra',
      icono: 'assets/images/icons/userMan.png',
      texto: '"Una masa la app. Puse que necesitaba un plomero y al toque me escribió uno. Me resolvió la pérdida en menos de una hora. Súper práctica, te saca del apuro sin vueltas."'
    },
    {
      nombre: 'Tomás Herrera',
      icono: 'assets/images/icons/userMan.png',
      texto: '"Muy buena onda todo. Busqué un electricista un sábado a la tarde y conseguí sin problema. Me gustó que podés ver las opiniones, te da más confianza para elegir."'
    },
    {
      nombre: 'Nicolás Rivas',
      icono: 'assets/images/icons/userMan.png',
      texto: '"Me re salvó Mano Amiga. Estaba buscando un pintor para arreglar unas paredes del depto y apareció uno de la zona. Coordinamos por WhatsApp y vino al día siguiente."'
    },
    {
      nombre: 'Fabián Quiroga',
      icono: 'assets/images/icons/userMan.png',
      texto: '"Está buenísima la idea. Necesitaba un jardinero para limpiar el fondo y encontré uno cerca de casa que labura joya. Todo fue rápido y directo, sin vueltas."'
    },
    {
      nombre: 'Gustavo Medina',
      icono: 'assets/images/icons/userMan.png',
      texto: '"Busqué un técnico para el lavarropas y en una hora ya lo tenía en casa. Mano Amiga funciona bárbaro, es ideal si no tenés a nadie de confianza a mano."'
    },
    {
      nombre: 'Florencia Acosta',
      icono: 'assets/images/icons/userWoman.png',
      texto: '"La usé para conseguir alguien que me ayude con la limpieza y fue lo más. La chica un amor, puntual y laburadora. Todo impecable, la volvería a llamar sin dudas."'
    },
    {
      nombre: 'Matías Aguirre',
      icono: 'assets/images/icons/userMan.png',
      texto: '"Tuve que arreglar una puerta del placard y encontré un carpintero que vino ese mismo día. Muy buena experiencia, la app es clara y no te hace perder tiempo."'
    },
    {
      nombre: 'Carla Roldán',
      icono: 'assets/images/icons/userWoman.png',
      texto: '"Se me rompió el calefón y estaba desesperada. Encontré un gasista cerca y al ratito ya estaba viendo el tema. Mano Amiga fue la salvación, posta."'
    },
    {
      nombre: 'Santiago Ferreyra',
      icono: 'assets/images/icons/userMan.png',
      texto: '"Cerradura rota y sin llaves, un bajón. Entré a Mano Amiga y encontré un cerrajero de toque. Rápido, buena onda y precio justo. Recomendado."'
    },
    {
      nombre: 'Juliana Vázquez',
      icono: 'assets/images/icons/userWoman.png',
      texto: '"Coordiné con un pintor para hacer unos arreglos en casa y salió todo diez puntos. Muy prolijo y cumplidor. Me encantó que desde la app ves todo fácil."'
    }
  ];


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
