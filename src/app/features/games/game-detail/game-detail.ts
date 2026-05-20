import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route } from '@angular/router';
import { RouterLink } from '@angular/router';
import { GameService } from '../../../core/services/game';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-detail.html',
  styleUrls: ['./game-detail.css']
})

export class GameDetailComponent implements OnInit {

  gameId: number | null = null;
  game: any = null;

  loading: boolean = false;
  error = '';

  constructor(private route: ActivatedRoute, private gameService: GameService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'ID do jogo não encontrado!';
      return;
    }

    this.gameId = Number(id);
    this.loadGame();
  }

  loadGame(): void {
    if (!this.gameId) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.gameService.getGameById(this.gameId).subscribe({
      next: (res: any) => {
        this.game = res;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.error = 'Erro ao carregar detalhes do jogo. Tente novamente.';
      }
    });
  }

  getGenres(): string {
    return this.game?.genres?.map((genre: any) => genre.name).join(', ') || 'Não informado';
  }

  getPlatForms(): string {
    return this.game?.platforms?.map((item: any) => item.platform.name).slice(0, 4).join(', ') || 'Não informado';
  }
}