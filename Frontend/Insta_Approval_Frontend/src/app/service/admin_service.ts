import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan';
import { AuthService } from './auth_service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/v1/admin';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return { Authorization: `Bearer ${this.authService.getToken()}` };
  }


  getPendingLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans/pending`, {
      headers: this.getHeaders()
    });
  }


  approveLoan(loanId: number, remarks: string): Observable<Loan> {
    return this.http.put<Loan>(`${this.baseUrl}/loans/approve/${loanId}`, remarks, {
      headers: this.getHeaders()
    });
  }

  // ✅ Reject loan
  rejectLoan(loanId: number, remarks: string): Observable<Loan> {
    return this.http.put<Loan>(`${this.baseUrl}/loans/reject/${loanId}`, remarks, {
      headers: this.getHeaders()
    });
  }
}
