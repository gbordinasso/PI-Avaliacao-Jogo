import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewService } from '../../../core/services/review';
import { GameService } from '../../../core/services/game';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './review-form.html',
  styleUrls: ['./review-form.css']
})

export class ReviewFormComponent implements OnInit {

  gameId: string | null = null;
  editId: string | null = null;

  game: any = null;
  reviewToEdit: any = null;

  rating: number | null = null;
  comment = '';

  error = '';
  pageLoading = false;
  saving = false;

  constructor(private route: ActivatedRoute, private router: Router, private reviewService: ReviewService, private gameService: GameService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.editId = this.route.snapshot.queryParamMap.get('editId');

    if (this.editId) {
      this.loadReviewToEdit();
      return;
    }

    if (!this.gameId) {
      this.error = 'Jogo não encontrado.';
      return;
    }

    this.loadGame();
  }

  loadReviewToEdit(): void {
    this.pageLoading = true;
    this.error = '';

    this.reviewService.getReviews().subscribe({
      next: (reviews: any[]) => {

        const review = reviews.find(r =>
          String(r.id) === String(this.editId)
        );

        if (!review) {
          this.error = 'Review não encontrada.';
          this.pageLoading = false;
          return;
        }

        this.reviewToEdit = review;

        this.gameId = review.gameId;
        this.rating = Number(review.rating);
        this.comment = review.comment;

        this.game = {
          name: review.gameName,
          background_image: review.gameImage
        };

        this.pageLoading = false;

        this.cdr.detectChanges();
      },

      error: () => {
        this.error = 'Erro ao carregar review.';
        this.pageLoading = false;

        this.cdr.detectChanges();
      }
    });
  }

  loadGame(): void {
    if (!this.gameId) {
      return;
    }

    this.gameService.getGameById(this.gameId).subscribe({
      next: (res: any) => {
        this.game = res;
      },
      error: () => {
        this.error = 'Erro ao carregar dados do jogo.';
      }
    });

    this.cdr.detectChanges();
  }

  submit(): void {
    this.error = '';

    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) {
      this.error = 'Você precisa estar logado para enviar uma review.';
      this.router.navigate(['/login']);
      return;
    }

    if (this.rating === null) {
      this.error = 'Informe uma nota.';
      return;
    }

    if (this.rating < 0 || this.rating > 10) {
      this.error = 'A nota deve estar entre 0 e 10.';
      return;
    }

    if (!this.comment.trim()) {
      this.error = 'Escreva um comentário.';
      return;
    }

    if (this.comment.trim().length < 5) {
      this.error = 'O comentário deve ter pelo menos 5 caracteres.';
      return;
    }

    const data = {
      gameId: this.gameId,
      gameName: this.game?.name || this.reviewToEdit?.gameName,
      gameImage: this.game?.background_image || this.reviewToEdit?.gameImage,
      rating: this.rating,
      comment: this.comment.trim(),
      userId: user.id,
      userName: this.reviewToEdit?.userName || user?.name || 'Usuário anônimo',
      createdAt: this.reviewToEdit?.createdAt || new Date().toISOString()
    };

    this.saving = true;

    if (this.editId) {
      this.reviewService.updateReview(this.editId, data).subscribe({
        next: () => {
          alert('Review atualizada com sucesso!');
          this.router.navigate(['/reviews']);

          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.log('Erro ao atualizar:', erro);
          this.error = 'Erro ao atualizar review.';
          this.saving = false;

          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.reviewService.createReview(data).subscribe({
      next: () => {
        alert('Review cadastrada com sucesso!');
        this.router.navigate(['/reviews']);

        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erro ao cadastrar review.';
        this.saving = false;

        this.cdr.detectChanges();
      }
    });
  }
}