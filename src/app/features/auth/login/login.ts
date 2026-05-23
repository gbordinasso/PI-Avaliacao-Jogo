import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

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

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  login() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Preencha todos os campos';
      return;
    }

    if (!this.email.includes('@')) {
      this.error = 'Email inválido';
      return;
    }

    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {

        this.loading = false;

        if (res.length > 0) {
          const user = res[0];

          localStorage.setItem('user', JSON.stringify(user));

          this.email = '';
          this.password = '';

          this.router.navigate(['/']);
          
        } else {
          this.error = 'Email ou senha inválidos';
          this.password = '';

          this.cdr.detectChanges();
        }

      },
      error: () => {
        this.loading = false;
        this.error = 'Erro ao conectar com o servidor';
      }
    });
  }

  cadastro() {
    this.router.navigate(['/register']);
  }
}