import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-location',
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  ciudades: string[] = [
    'Mar del Plata',
    'Buenos Aires',
    'Córdoba',
    'Rosario',
    'Mendoza',
    'La Plata',
    'San Miguel de Tucumán',
    'Salta',
    'Santa Fe',
    'San Juan'
  ];

  ciudadSeleccionada: string = '';

  seleccionarCiudad(ciudad: string) {
    console.log('Ciudad seleccionada:', ciudad);
  }
}
