import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  faqList = [
    {
      pregunta: '¿Qué es Mano Amiga y para qué sirve?',
      respuesta: 'Es una app que conecta personas que necesitan ayuda en tareas del hogar con profesionales disponibles en su ciudad.',
      abierta: false,
      id: 0
    },
    {
      pregunta: '¿Cómo contacto a un trabajador?',
      respuesta: 'Buscás el oficio que necesitás, elegís una publicación y hacés clic en el botón para llamarlo o escribirle.',
      abierta: false,
      id: 1
    },
    {
      pregunta: '¿La app es gratuita?',
      respuesta: 'Sí, es gratis tanto para usuarios como para trabajadores que publican sus servicios.',
      abierta: false,
      id: 2
    },
    {
      pregunta: '¿Cómo sé si un profesional es confiable?',
      respuesta: 'Podés ver opiniones de otros usuarios y la experiencia que detalla cada trabajador en su perfil.',
      abierta: false,
      id: 3
    },
    {
      pregunta: '¿Qué hago si tengo un problema con un servicio?',
      respuesta: 'Podés dejar una reseña negativa y reportar el perfil desde la app para que lo revisemos.',
      abierta: false,
      id: 4
    }
  ];

  toggleOption(num: number) {
    this.faqList[num].abierta = !this.faqList[num].abierta;
  }
}
