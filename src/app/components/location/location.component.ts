import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-location',
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  ciudades: string[] = [
    'Mar del Plata'
  ];

  constructor(private _auth: AuthService) {

  }

  ciudadSeleccionada: string = '';

  seleccionarCiudad(ciudad: string) {
    console.log('Ciudad seleccionada:', ciudad);
  }

  register() {
    this._auth.loginWithRedirect({  
      appState: { target: '/ruta-destino' }
    });
  }
}
