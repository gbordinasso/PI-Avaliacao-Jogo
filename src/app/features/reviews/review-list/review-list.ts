import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReviewService } from '../../../core/services/review';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './review-list.html',
  styleUrls: ['./review-list.css']
})
export class ReviewListComponent implements OnInit {

  reviews: any[] = [];
  filteredReviews: any[] = [];
  gameFilter: string = '';

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe((res: any) => {
      this.reviews = res.results ?? res.data ?? res ?? [];
      this.filteredReviews = this.reviews;
    });
  }

  filterByGame(): void {
    if (!this.gameFilter.trim()) {
      this.filteredReviews = this.reviews;
      return;
    }

    this.filteredReviews = this.reviews.filter(r =>
      r.gameId.toString().includes(this.gameFilter)
    );
  }

  delete(id: number): void {
    if (!confirm('Deseja excluir esta review?')) return;

    this.reviewService.deleteReview(id).subscribe(() => {
      this.reviews = this.reviews.filter(r => r.id !== id);
      this.filterByGame();
    });
  }

  getStars(rating: number): string[] {
    const safeRating = rating ?? 0;
    return Array(Math.round(safeRating)).fill('⭐');
  }
}