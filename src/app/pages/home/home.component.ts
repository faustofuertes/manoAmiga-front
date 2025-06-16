import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationComponent } from "../../components/location/location.component";
import { UsersCardsComponent } from "../../components/users-cards/users-cards.component";
import { GeneralReviewsComponent } from "../../components/general-reviews/general-reviews.component";
import { FAQComponent } from "../../components/faq/faq.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LocationComponent, UsersCardsComponent, GeneralReviewsComponent, FAQComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // corregí styleUrl a styleUrls (plural)
})
export class HomeComponent implements OnInit, OnDestroy {
  jobs: string[] = ['Electricistas', 'Plomeros', 'Jardineros', 'Pintores', 'Cerrajeros', 'Tecnicos', 'Carpinteros', 'Limpieza'];
  currentJob: string = this.jobs[0];
  private index: number = 0;
  animate: boolean = true;
  private intervalId: any;
  location = 'Mar del Plata';

  isDesktop: boolean = window.innerWidth > 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = event.target.innerWidth > 768;
  }

  ngOnInit() {
    if (this.isDesktop) {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.intervalId = setInterval(() => {
      this.animate = false;
      setTimeout(() => {
        this.index = (this.index + 1) % this.jobs.length;
        this.currentJob = this.jobs[this.index];
        this.animate = true;
      }, 50);
    }, 3100);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
