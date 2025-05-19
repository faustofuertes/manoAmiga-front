import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationComponent } from "../../components/location/location.component";
import { UsersCardsComponent } from "../../components/users-cards/users-cards.component";
import { GeneralReviewsComponent } from "../../components/general-reviews/general-reviews.component";
import { FAQComponent } from "../../components/faq/faq.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, LocationComponent, UsersCardsComponent, GeneralReviewsComponent, FAQComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  jobs: string[] = ['plomeros', 'electricistas', 'jardineros', 'pintores', 'cerrajeros', 'carpinteros', 'tecnicos', 'limpieza'];
  currentJob: string = this.jobs[0];
  private index: number = 0;
  animate: boolean = false;
  private intervalId: any;
  location = 'Mar del Plata'

  ngOnInit() {
    // Actualizamos el texto antes de iniciar la animación
    this.intervalId = setInterval(() => {
      this.animate = false; // Reseteamos la animación
      setTimeout(() => {
        this.index = (this.index + 1) % this.jobs.length;
        this.currentJob = this.jobs[this.index]; // Cambiamos el trabajo antes de la animación
        this.animate = true; // Iniciamos la animación de nuevo
      }, 50); // Retardo mínimo para evitar que la animación ocurra antes de que el texto cambie
    }, 3100); // tiempo entre cambios
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpiamos el intervalo cuando el componente se destruye
  }

}
