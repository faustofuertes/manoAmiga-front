import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../interfaces/review';
import { ReviewsService } from '../../services/reviews.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-reviews',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-reviews.component.html',
  styleUrl: './personal-reviews.component.css'
})
export class PersonalReviewsComponent implements OnInit {
  reviews?: Review[];
  @Input() postId?: string;
  @Input() posterId?: string | null;
  isAdding = false;
  needLogin = false;
  form: FormGroup;

  stars = [1, 2, 3, 4, 5];
  rating = 0; // valor seleccionado

  rate(value: number) {
    this.rating = value;
    this.form.get('rating')?.setValue(value); // si querés guardarlo en el formulario
  }


  constructor(
    private _myReviewService: ReviewsService,
    private _auth: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      rating: [0, Validators.required],
      review: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
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

  authenticate() {
    this._auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin, // ← http://localhost:4200
      },
      appState: { target: '/perfil/' + this.postId } // ← correcta forma
    });
  }

  closeIfOutside(event: MouseEvent) {
    this.isAdding = false;
  }

  submitReview() {
    const newReview: Review = {
      authorId: localStorage.getItem('userID'),
      targetId: this.posterId,
      postId: this.postId,
      userName: localStorage.getItem('userName'),
      score: this.form.value.rating,
      textReview: this.form.value.review
    }

    this._myReviewService.postReview(newReview).subscribe(() => {
      this.loadReviews();
      this.isAdding = !this.isAdding;
      this.form.get('rating')?.setValue(0);
      this.form.get('review')?.setValue('');      
    }, error => {
      console.log('Error al agregar la review.')
    })

  }
}
