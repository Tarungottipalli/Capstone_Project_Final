import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Loan } from '../models/loan';
import { AuthService } from './auth_service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return { Authorization: `Bearer ${token}` };
  }


  // Apply Loan
applyLoan(customerId: string, request: any) {
  return this.http.post(
    `${this.baseUrl}/${customerId}/loans`,
    request,
    { headers: this.getHeaders() }
  );
}


  getCustomer(customerId: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${customerId}`,
      { headers: this.getHeaders() }
    );
  }

  getLoans(customerId: string): Observable<Loan[]> {
    return this.http.get<Loan[]>(
      `${this.baseUrl}/${customerId}/loans`,
      { headers: this.getHeaders() }
    );
  }


  getLoanById(loanId: string): Observable<Loan> {
    return this.http.get<Loan>(
      `${this.baseUrl}/loans/${loanId}`,
      { headers: this.getHeaders() }
    );
  }

  updateLoan(loanId: string, request: any): Observable<Loan> {
    return this.http.put<Loan>(
      `${this.baseUrl}/loans/${loanId}`,
      request,
      { headers: this.getHeaders() }
    );
  }

  cancelLoan(loanId: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/loans/${loanId}`,
      { headers: this.getHeaders(), responseType: 'text' }
    );
  }
}
