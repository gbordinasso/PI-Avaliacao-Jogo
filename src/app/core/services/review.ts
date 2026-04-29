import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  private api = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  getReviews() {
    return this.http.get<any[]>(this.api);
  }

  createReview(review: any) {
    return this.http.post(this.api, review);
  }

  deleteReview(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  updateReview(id: number, review: any) {
    return this.http.put(`${this.api}/${id}`, review);
  }

  getReviewById(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }
}