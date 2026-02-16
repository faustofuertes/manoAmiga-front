import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '../../services/translate.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageModalComponent } from '../../components/language-modal/language-modal.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, TranslatePipe, LanguageModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuAbierto = false;
  isAuthenticated = false;
  langModalOpen = false;

  constructor(
    public _auth: AuthService,
    private _router: Router,
    public theme: ThemeService,
    public ts: TranslateService
  ) { }

  ngOnInit(): void {
    this._auth.isAuthenticated$.subscribe(result => {
      this.isAuthenticated = result;
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

  openLangModal() {
    this.langModalOpen = true;
  }

  closeLangModal() {
    this.langModalOpen = false;
  }

}
