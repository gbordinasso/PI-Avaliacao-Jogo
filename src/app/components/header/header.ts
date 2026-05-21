import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent implements OnInit {

  user: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/']);
  }
}