import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-users-cards',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './users-cards.component.html',
  styleUrl: './users-cards.component.css'
})
export class UsersCardsComponent {
}
