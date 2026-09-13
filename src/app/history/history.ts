import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History implements OnInit {

  results: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.apiService.getMyResults().subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load quiz history:', error);
        this.errorMessage = 'Unable to load your quiz history.';
        this.loading = false;
      }
    });
  }
}