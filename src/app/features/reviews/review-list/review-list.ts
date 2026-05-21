import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReviewService } from '../../../core/services/review';
import { ChangeDetectorRef } from '@angular/core';

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

  loggedUser: any = null;

  gameFilter = '';
  loading = false;
  error = '';

  constructor(private reviewService: ReviewService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user') || 'null');
    this.loadReviews();
  }

  canManageReview(review: any): boolean {
    return this.loggedUser && String(review.userId) === String(this.loggedUser.id);
  }

  loadReviews(): void {
    this.loading = true;
    this.error = '';

    this.reviewService.getReviews().subscribe({
      next: (res: any) => {
        this.reviews = res.results ?? res.data ?? res ?? [];
        this.filteredReviews = this.reviews;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erro ao carregar reviews.';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  filterByGame(): void {
    const filter = this.gameFilter.toLowerCase().trim();

    if (!filter) {
      this.filteredReviews = this.reviews;
      return;
    }

    this.filteredReviews = this.reviews.filter(review =>
      review.gameId?.toString().includes(filter) ||
      review.gameName?.toLowerCase().includes(filter)
    );
  }

  clearFilter(): void {
    this.gameFilter = '';
    this.filteredReviews = this.reviews;
  }

  delete(review: any): void {
    if (!this.canManageReview(review)) {
      alert('Você só pode excluir suas próprias reviews.');
      return;
    }

    if (!confirm('Deseja excluir esta review?')) {
      return;
    }


    this.reviewService.deleteReview(review.id).subscribe({
      next: () => {
        alert(`Review de ${review.gameName || 'jogo'} excluída com sucesso!`);

        this.reviews = this.reviews.filter(r => r.id !== review.id);
        this.filterByGame();

        this.cdr.detectChanges();
      },
      error: () => {
        alert('Erro ao excluir review.');
      }
    });
  }

  getStars(rating: number): string[] {
    const safeRating = Math.round(rating || 0);
    return Array(safeRating).fill('⭐');
  }

  formatDate(date: string): string {
    if (!date) return 'Data não informada';

    return new Date(date).toLocaleDateString('pt-BR');
  }
}