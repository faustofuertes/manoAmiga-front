import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-failure-post',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './failure-post.component.html',
  styleUrl: './failure-post.component.css'
})
export class FailurePostComponent {

}
