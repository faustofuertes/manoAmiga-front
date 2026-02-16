import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-success-post',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './success-post.component.html',
  styleUrl: './success-post.component.css'
})
export class SuccessPostComponent {

}
