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
      nombre: 'Juan Salvo',
      icono: 'assets/images/icons/plomero.png',
      texto: 'La verdad que la app está buenísima, encontré un plomero en minutos y me resolvió todo al toque. Súper práctica y fácil de usar. Me salvó en una emergencia con una pérdida de agua.'
    },
    {
      nombre: 'Pedro Gómez',
      icono: 'assets/images/icons/electricista.png',
      texto: 'Muy buena idea la de esta app. Busqué un electricista y al rato ya me estaba escribiendo. Todo desde el celu, sin vueltas. Me encantó que podés ver las opiniones de otros también.'
    },
    {
      nombre: 'Luis Fernández',
      icono: 'assets/images/icons/pintor.png',
      texto: 'Re bien la app. Pedí un pintor para arreglar el departamento y todo salió joya. Me gustó que no tuve que andar preguntando en grupos ni nada raro. Todo directo desde Mano Amiga.'
    },
    {
      nombre: 'Carlos Martínez',
      icono: 'assets/images/icons/jardinero.png',
      texto: 'Muy copada la app, encontré un jardinero de confianza cerca de casa. Todo fue fácil, desde el contacto hasta que vino. Está buena la idea de ayudar a los que laburan por su cuenta.'
    },
    {
      nombre: 'Eduardo Ramos',
      icono: 'assets/images/icons/tecnico.png',
      texto: 'Excelente. Me conecté con un técnico para revisar el lavarropas y a la hora ya estaba en casa. Mano Amiga es una solución re útil, sobre todo si no conocés a nadie de confianza.'
    },
    {
      nombre: 'Martina López',
      icono: 'assets/images/icons/limpieza.png',
      texto: 'La usé para conseguir alguien que me ayude con la limpieza y fue un golazo. La chica que vino un amor, re puntual y dejó todo impecable. Me encantó poder coordinar todo por la app.'
    },
    {
      nombre: 'Ramiro Torres',
      icono: 'assets/images/icons/carpintero.png',
      texto: 'Busqué un carpintero para arreglar una puerta y en una hora ya estaba charlando con uno. Mano Amiga es muy intuitiva, y encima los perfiles tienen reseñas reales. Muy buena experiencia.'
    },
    {
      nombre: 'Sofía Acuña',
      icono: 'assets/images/icons/tecnico.png',
      texto: 'Tuve un problema con el calefón y gracias a la app lo pude resolver en el día. Todo bien claro, sin vueltas. Muy útil para encontrar profesionales cerca sin tener que andar preguntando.'
    },
    {
      nombre: 'Diego Navarro',
      icono: 'assets/images/icons/cerrajero.png',
      texto: 'Se me rompió la cerradura y con Mano Amiga encontré un cerrajero al toque. Muy recomendable la app, fácil, rápida y me gustó que podés ver el precio antes de llamar.'
    },
    {
      nombre: 'Andrea Morales',
      icono: 'assets/images/icons/pintor.png',
      texto: 'Me ayudó un montón. Coordiné con un pintor por la app, vino en horario, súper respetuoso. Mano Amiga es ideal si no conocés a nadie que te recomiende y querés algo confiable.'
    }
  ];



  current = 0;
  intervalId: any;
  isMobile = false;

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;

    if (this.isMobile) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.siguiente();
    }, 3000);
  }

  siguiente() {
    this.current = (this.current + 1) % this.testimonios.length;
  }

  anterior() {
    this.current = (this.current - 1 + this.testimonios.length) % this.testimonios.length;
  }

  getClass(index: number): string {
    const total = this.testimonios.length;
    if (index === this.current) return 'active';
    if (index === (this.current - 1 + total) % total) return 'prev';
    if (index === (this.current + 1) % total) return 'next';
    return 'hidden';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const isNowMobile = event.target.innerWidth <= 768;

    if (isNowMobile && !this.isMobile) {
      this.isMobile = true;
      this.startAutoSlide();
    }
  }
}
