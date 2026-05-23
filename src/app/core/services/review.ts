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

  getReviewById(id: String) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  createReview(review: any) {
    return this.http.post(this.api, review);
  }
  
  updateReview(id: String, review: any) {
    return this.http.put(`${this.api}/${id}`, review);
  }

  deleteReview(id: String) {
    return this.http.delete(`${this.api}/${id}`);
  }

}