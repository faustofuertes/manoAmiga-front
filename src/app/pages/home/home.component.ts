import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersCardsComponent } from "../../components/users-cards/users-cards.component";
import { GeneralReviewsComponent } from "../../components/general-reviews/general-reviews.component";
import { FAQComponent } from "../../components/faq/faq.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  imports: [RouterLink, UsersCardsComponent, GeneralReviewsComponent, FAQComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // corregí styleUrl a styleUrls (plural)
})
export class HomeComponent implements OnInit, OnDestroy {
  jobs: string[] = ['electricistas', 'plomeros', 'jardineros', 'pintores', 'cerrajeros', 'técnicos', 'carpinteros', 'limpieza'];
  currentJob: string = this.jobs[0];
  private index: number = 0;
  animate: boolean = true;
  private intervalId: any;
  location = 'Mar del Plata';
  isDesktop: boolean = window.innerWidth > 768;

  constructor(
    private _auth: AuthService,
    private router:Router
  ) { }

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

  register() {
    this._auth.isAuthenticated$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/crear-publicacion']);
      } else {
        this._auth.loginWithRedirect({
          authorizationParams: {
            redirect_uri: window.location.origin, // ← http://localhost:4200
          },
          appState: { target: '/crear-publicacion' } // ← correcta forma
        });
      }
    });
  }
  

}
