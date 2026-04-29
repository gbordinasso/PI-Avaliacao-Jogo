import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { GameService } from '../../core/services/game';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  games: any[] = [];
  allGames: any[] = [];

  searchText: string = '';
  loading: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.loading = true;

    this.gameService.getGames().subscribe({
      next: (res: any) => {
        this.games = res.results ?? res;
        this.allGames = this.games;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterGames(): void {
    const value = this.searchText.toLowerCase().trim();

    if (!value) {
      this.games = this.allGames;
      return;
    }

    this.games = this.allGames.filter(game =>
      game.name.toLowerCase().includes(value)
    );
  }

  clearFilter(): void {
    this.searchText = '';
    this.games = this.allGames;
  }
}