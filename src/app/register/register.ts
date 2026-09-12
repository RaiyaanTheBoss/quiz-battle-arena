import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username = '';
  email = '';
  password = '';

  constructor(private api: ApiService) {}

  register() {

    if (!this.username || !this.email || !this.password) {
      alert('Please fill all fields');
      return;
    }

    this.api.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful!');
      },

      error: (error) => {
        console.error('Registration failed:', error);
        alert(error.error?.message || 'Registration failed');
      }
    });

  }
}