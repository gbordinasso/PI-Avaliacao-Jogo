import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

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
  cpf = '';

  constructor(private auth: AuthService) {}

  register() {

    if (!this.validateCPF(this.cpf)) {
      alert('CPF inválido');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      cpf: this.cpf,
      role: 'user'
    };

    this.auth.register(user).subscribe(() => {
      alert('Usuário cadastrado!');
    });
  }

  validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }

    let check1 = (sum * 10) % 11;
    if (check1 === 10) check1 = 0;

    if (check1 !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }

    let check2 = (sum * 10) % 11;
    if (check2 === 10) check2 = 0;

    return check2 === parseInt(cpf[10]);
  }
}