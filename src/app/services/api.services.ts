import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://quiz-battle-arena-backend-pcsy.onrender.com';

  constructor(private http: HttpClient) {}

  testBackend() {
    return this.http.get<{ message: string }>(this.apiUrl);
  }

  register(user: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.http.post(
      `${this.apiUrl}/api/auth/register`,
      user
    );
  }

  login(data: {
    email: string;
    password: string;
  }) {
    return this.http.post<{
      message: string;
      token: string;
      user: {
        id: string;
        username: string;
        email: string;
      };
    }>(
      `${this.apiUrl}/api/auth/login`,
      data
    );
  }

  saveResult(result: {
    category: string;
    score: number;
    totalQuestions: number;
    accuracy: number;
  }) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      `${this.apiUrl}/api/results`,
      result,
      { headers }
    );
  }

  getMyResults() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/api/results/my-results`,
      { headers }
    );
  }
  getLeaderboard() {
  return this.http.get<any[]>(
    `${this.apiUrl}/api/results/leaderboard`
  );
}
}