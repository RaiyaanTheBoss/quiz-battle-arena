import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
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

  results = signal<any[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  constructor(private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {

    this.apiService.getLeaderboard().subscribe({

      next: (data) => {
        console.log('LEADERBOARD DATA RECEIVED:', data);

        this.results.set(data);
        this.loading.set(false);
        this.cdr.detectChanges();

        console.log('LOADING STATE:', this.loading);
        console.log('RESULTS STATE:', this.results);
      },

      error: (error) => {
        console.error('Failed to load leaderboard:', error);

        this.errorMessage.set('Unable to load leaderboard.');
        this.loading.set(false);
      }

    });
  }
}