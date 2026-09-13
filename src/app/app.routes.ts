import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Quiz } from './quiz/quiz';
import { Leaderboard } from './leaderboard/leaderboard';
import { Register } from './register/register';
import { History } from './history/history';
import { Login } from './login/login';

import { authGuard } from './auth-guard';

export const routes: Routes = [

  // Public page
  {
    path: '',
    component: Home
  },

  // Login page
  {
    path: 'login',
    component: Login
  },

  // Registration page
  {
    path: 'register',
    component: Register
  },

  // Protected pages
  {
    path: 'battle',
    component: Quiz,
    canActivate: [authGuard]
  },

  {
    path: 'leaderboard',
    component: Leaderboard,
    canActivate: [authGuard]
  },

  {
    path: 'history',
    component: History,
    canActivate: [authGuard]
  }

];