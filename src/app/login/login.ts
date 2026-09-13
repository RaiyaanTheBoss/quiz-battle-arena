import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // =========================
  // FORM DATA
  // =========================

  email = '';
  password = '';

  // =========================
  // UI STATE
  // =========================

  errorMessage = '';
  isLoading = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  // =========================
  // LOGIN
  // =========================

  login(): void {

    // Clear previous error
    this.errorMessage = '';

    // Prevent duplicate clicks
    if (this.isLoading) {
      return;
    }

    // =========================
    // VALIDATION
    // =========================

    if (!this.email.trim()) {
      this.errorMessage = 'Please enter your email.';
      return;
    }

    if (!this.password) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    // =========================
    // START LOADING
    // =========================

    this.isLoading = true;

    // Force UI update
    this.cdr.detectChanges();

    console.log('Sending login request...');

    // =========================
    // LOGIN REQUEST
    // =========================

    this.apiService.login({
      email: this.email.trim(),
      password: this.password
    })
    .pipe(

      // This ALWAYS runs:
      // success OR error
      finalize(() => {

        console.log('Login request finished.');

        this.isLoading = false;

        // Force Angular to update the button
        this.cdr.detectChanges();

      })

    )
    .subscribe({

      // =========================
      // SUCCESS
      // =========================

      next: (response) => {

        console.log('Login successful');
        console.log('Backend response:', response);

        // Check token
        if (!response?.token) {

          this.errorMessage =
            'Login succeeded, but no authentication token was received.';

          this.isLoading = false;
          this.cdr.detectChanges();

          return;
        }

        // =========================
        // SAVE TOKEN
        // =========================

        localStorage.setItem(
          'token',
          response.token
        );

        console.log(
          'Token saved:',
          localStorage.getItem('token')
        );

        // Clear password
        this.password = '';

        // =========================
        // REDIRECT HOME
        // =========================

        this.router.navigate(['/']);

      },

      // =========================
      // ERROR
      // =========================

      error: (error) => {

        console.error('Login failed:', error);

        // IMPORTANT:
        // Stop loading immediately
        this.isLoading = false;

        // =========================
        // WRONG EMAIL / PASSWORD
        // =========================

        if (error.status === 401) {

          this.errorMessage =
            'Invalid email or password.';

        }

        // =========================
        // SERVER NOT AVAILABLE
        // =========================

        else if (error.status === 0) {

          this.errorMessage =
            'Cannot connect to the server. Please try again.';

        }

        // =========================
        // BACKEND VALIDATION ERROR
        // =========================

        else if (error.error?.message) {

          this.errorMessage =
            error.error.message;

        }

        // =========================
        // OTHER ERROR
        // =========================

        else {

          this.errorMessage =
            'Login failed. Please try again.';

        }

        // Force Angular UI update
        this.cdr.detectChanges();

      }

    });

  }
}