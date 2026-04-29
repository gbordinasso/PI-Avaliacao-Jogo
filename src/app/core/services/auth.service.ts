import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.get<any[]>(
      `${this.api}?email=${email}&password=${password}`
    );
  }

  register(user: any) {
    return this.http.post(this.api, user);
  }
}