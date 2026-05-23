import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api';
  private apiKey = '390586cb4eb74151a37069a9db83e9fa';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get(
      `${this.apiUrl}/games?key=${this.apiKey}`
    );
  }

  searchGames(name: String) {
    return this.http.get(
      `${this.apiUrl}/games?search=${name}&key=${this.apiKey}`
    );
  }

  getGameById(id: String) {
    return this.http.get(
      `${this.apiUrl}/games/${id}?key=${this.apiKey}`
    );
  }
}