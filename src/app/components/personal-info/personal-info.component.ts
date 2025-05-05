import { Component, Input } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-personal-info',
  imports: [],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {
  @Input() usuario?: Usuario;

}
