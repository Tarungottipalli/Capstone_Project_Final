import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth'; 

  constructor(private http: HttpClient) {}

  // Register Customer
  register(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  // Login
  login(request: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, request);
  }

  // Save login data in localStorage
  saveLoginData(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    if (res.customerId) {
      localStorage.setItem('customerId', res.customerId.toString());
    }
  }

  // Clear data on logout
  logout() {
    localStorage.clear();
  }

  // Helpers
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getCustomerId(): string | null {
    return localStorage.getItem('customerId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
