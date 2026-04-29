import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/auth/login/login';
import { GameDetailComponent } from './features/games/game-detail/game-detail';
import { ReviewListComponent } from './features/reviews/review-list/review-list';
import { ReviewFormComponent } from './features/reviews/review-form/review-form';
import { RegisterComponent } from './features/cadastro/cadastro';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: 'reviews', component: ReviewListComponent },
  { path: 'review-form/:id', component: ReviewFormComponent },
  { path: 'register', component: RegisterComponent },
];