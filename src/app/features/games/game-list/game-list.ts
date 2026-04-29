import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.css'],
  imports: [CommonModule, RouterLink]
})

export class GameListComponent implements OnInit {

  games: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getGames().subscribe((res: any) => {
      this.games = res.results;
    });
  }
}