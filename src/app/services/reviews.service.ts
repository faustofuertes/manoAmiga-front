import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  //baseURL = 'http://localhost:4000/api/reviews'
  baseURL = 'https://manoamiga-back.onrender.com/api/reviews'

  constructor(private _http: HttpClient) { }

  postReview(review: Review): Observable<Review> {
    return this._http.post<Review>(this.baseURL, review);
  }

  getReviewPerPost(postId: string | undefined): Observable<Review[]> {
    return this._http.get<Review[]>(`${this.baseURL}/${postId}`);
  }
}
