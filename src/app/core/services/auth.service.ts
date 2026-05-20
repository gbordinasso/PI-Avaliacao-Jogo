import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    const emailEncoded = encodeURIComponent(email);
    const passwordEncoded = encodeURIComponent(password);

    return this.http.get<any[]>(
      `${this.api}?email=${emailEncoded}&password=${passwordEncoded}`
    );
  }

  register(user: any) {
    return this.http.post(this.api, user);
  }

  getUsers() {
    return this.http.get<any[]>(this.api);
  }
}