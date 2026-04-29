import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule,  RouterLink],
  templateUrl: './game-detail.html',
  styleUrls: ['./game-detail.css']
})

export class GameDetailComponent implements OnInit {

  gameId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');

    console.log('Game ID:', this.gameId);

    if (!this.gameId) {
      console.error('ID do jogo não encontrado na rota!');
    }
  }
}