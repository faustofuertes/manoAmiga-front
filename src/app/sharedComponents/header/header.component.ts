import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuAbierto = false;
  isAuthenticated = false;

  constructor(
    public _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._auth.isAuthenticated$.subscribe(result => {
      this.isAuthenticated = result;
      if (this.isAuthenticated) {
        this._router.navigate(['']);
      }
    })
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  logIn() {
    this._auth.loginWithRedirect();
  }

  logOut() {
    this._auth.logout()
  }

}
