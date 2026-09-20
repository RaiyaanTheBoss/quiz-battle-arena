import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard implements OnInit {

  results: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {

    this.apiService.getLeaderboard().subscribe({

      next: (data) => {
        console.log('LEADERBOARD DATA RECEIVED:', data);

        this.results = data;
        this.loading = false;
      },

      error: (error) => {
        console.error('Failed to load leaderboard:', error);

        this.errorMessage = 'Unable to load leaderboard.';
        this.loading = false;
      }

    });
  }
}