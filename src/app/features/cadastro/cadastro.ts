import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {

    if (!this.name || !this.email || !this.password) {
      alert('Preencha todos os campos');
      return;
    }

    if (!this.email.includes('@')) {
      alert('Email inválido');
      return;
    }

    if (this.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'user'
    };

    this.auth.getUsers().subscribe({

      next: (users: any[]) => {

        const emailExists = users.some(
          user => user.email === this.email
        );

        if (emailExists) {
          alert('Este mail já está cadastrado');
          return;
        }

        const user = {
          name: this.name,
          email: this.email,
          password: this.password,
          role: 'user'
        };

        this.auth.register(user).subscribe({

          next: () => {

            alert('Usuário cadastrado com sucesso!');

            this.name = '';
            this.email = '';
            this.password = '';

            this.router.navigate(['/login']);
          },

          error: () => {
            alert('Erro ao cadastrar usuário');
          }

        });

      },

      error: () => {
        alert('Erro ao verificar usuários');
      }

    });
    
  }
  
}