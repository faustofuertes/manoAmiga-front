import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-profile-card',
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  @Input() usuario?: Usuario;
}
