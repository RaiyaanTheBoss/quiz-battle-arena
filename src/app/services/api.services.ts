import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  testBackend() {
    return this.http.get<{ message: string }>(this.apiUrl);
  }

  register(user: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.apiUrl}/api/auth/register`, user);
  }

  saveResult(result: {
    category: string;
    score: number;
    totalQuestions: number;
    accuracy: number;
  }) {
    return this.http.post(`${this.apiUrl}/api/results`, result);
  }
}