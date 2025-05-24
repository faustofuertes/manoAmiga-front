import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../interfaces/review';
import { ReviewsService } from '../../services/reviews.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-personal-reviews',
  imports: [CommonModule],
  templateUrl: './personal-reviews.component.html',
  styleUrl: './personal-reviews.component.css'
})
export class PersonalReviewsComponent implements OnInit {
  reviews?: Review[];
  @Input() postId?: string;
  isAdding = false;
  needLogin = false;

  constructor(
    private _myReviewService: ReviewsService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._myReviewService.getReviewPerPost(this.postId).subscribe(data => {
      this.reviews = data;
    })
  }

  toggleReview() {
    this._auth.isAuthenticated$.subscribe(res => {
      if (res) {
        this.isAdding = !this.isAdding;
      }
      else {
        this.needLogin = !this.needLogin;
      }
    })
  }

  login() {
    this._auth.loginWithRedirect();
  }

  closeIfOutside(event: MouseEvent) {
    this.isAdding = false;
  }
}
