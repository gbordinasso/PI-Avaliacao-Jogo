import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../../core/services/review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-form.html',
  styleUrls: ['./review-form.css']
})
export class ReviewFormComponent implements OnInit {

  gameId: string | null = null;
  editId: string | null = null;

  rating = 0;
  comment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.queryParamMap.get('gameId');
    this.editId = this.route.snapshot.queryParamMap.get('editId');

    if (this.editId) {
      this.reviewService.getReviewById(Number(this.editId))
        .subscribe((res: any) => {
          this.rating = res.rating;
          this.comment = res.comment;
          this.gameId = res.gameId;
        });
    }
  }

  submit(): void {

    const data = {
      gameId: this.gameId,
      rating: this.rating,
      comment: this.comment
    };

    if (this.editId) {
      this.reviewService.updateReview(Number(this.editId), data)
        .subscribe(() => {
          this.router.navigate(['/reviews']);
        });
    } else {
      this.reviewService.createReview(data)
        .subscribe(() => {
          this.router.navigate(['/reviews']);
        });
    }
  }
}