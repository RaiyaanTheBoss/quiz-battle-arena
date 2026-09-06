import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Quiz } from './quiz/quiz';

export const routes: Routes = [
  {
    path: '',
    component: Quiz
  },
  {
    path: 'register',
    component: Register
  }
];