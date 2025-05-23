import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../interfaces/review';
import { ReviewsService } from '../../services/reviews.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-reviews',
  imports: [CommonModule],
  templateUrl: './personal-reviews.component.html',
  styleUrl: './personal-reviews.component.css'
})
export class PersonalReviewsComponent implements OnInit {
  reviews?: Review[];
  @Input() postId?: string;

  constructor(private _myReviewService: ReviewsService) { }

  ngOnInit(): void {
    this._myReviewService.getReviewPerPost(this.postId).subscribe(data => {
      this.reviews = data;
      console.log(this.reviews)
    })
  }
}
