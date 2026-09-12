import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Quiz } from './quiz/quiz';
import { Leaderboard } from './leaderboard/leaderboard';
import { History } from './history/history'; 
import { Register } from './register/register';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'battle',
    component: Quiz
  },
  {
    path: 'leaderboard',
    component: Leaderboard
  },
  {
    path: 'history',
    component: History 
  },
  {
    path: 'register',
    component: Register
  }
];