import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('HISTORY COMPONENT IS RUNNING');
    this.loadHistory();
  }

  loadHistory(): void {
    this.apiService.getMyResults().subscribe({
      next: (data) => {
        console.log('HISTORY DATA RECEIVED:', data);
        this.results = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load quiz history:', error);
        this.errorMessage = 'Unable to load your quiz history.';
        this.loading = false;
      }
    });
  }
  getCategoryName(category: string): string {
    return category.replace(/^[^\s]+\s/, '');
  }
  getCategoryIcon(category: string): string {
    return category.split(' ')[0];
  }
}