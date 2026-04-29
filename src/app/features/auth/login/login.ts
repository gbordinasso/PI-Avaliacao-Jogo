import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.loading = true;
    this.error = '';

    this.auth.login(this.email, this.password)
      .subscribe({
        next: (res: any) => {

          this.loading = false;

          if (res.length > 0) {
            localStorage.setItem('user', JSON.stringify(res[0]));

            this.router.navigate(['/']);
          } else {
            this.error = 'Usuário ou senha inválidos';
          }

        },
        error: () => {
          this.loading = false;
          this.error = 'Erro no servidor';
        }
      });
  }
}