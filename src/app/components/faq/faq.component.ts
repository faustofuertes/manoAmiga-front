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
      id: 0,
      pregunta: '¿Qué es Mano Amiga y para qué sirve?',
      respuesta: 'Mano Amiga es una plataforma que conecta personas que necesitan ayuda con tareas del hogar con profesionales independientes disponibles en su ciudad.',
      abierta: false
    },
    {
      id: 1,
      pregunta: '¿Cómo contacto a un trabajador?',
      respuesta: 'Buscás el oficio que necesitás, elegís una publicación y hacés clic en el botón para llamarlo o escribirle directamente.',
      abierta: false
    },
    {
      id: 2,
      pregunta: '¿La app es gratuita?',
      respuesta: 'Sí, es completamente gratuita tanto para quienes buscan un servicio como para los trabajadores que publican sus avisos.',
      abierta: false
    },
    {
      id: 3,
      pregunta: '¿Cómo sé si un profesional es confiable?',
      respuesta: 'Cada publicación incluye una descripción del servicio, experiencia del trabajador y reseñas reales de otros usuarios que lo hayan contratado.',
      abierta: false
    },
    {
      id: 4,
      pregunta: '¿Mano Amiga participa en los trabajos o contrataciones?',
      respuesta: 'No. Mano Amiga solo ofrece el espacio para que los profesionales publiquen sus servicios y los usuarios los contacten directamente. No intervenimos en la contratación ni en la ejecución del trabajo.',
      abierta: false
    }
  ];


  toggleOption(num: number) {
    this.faqList[num].abierta = !this.faqList[num].abierta;
  }
}
