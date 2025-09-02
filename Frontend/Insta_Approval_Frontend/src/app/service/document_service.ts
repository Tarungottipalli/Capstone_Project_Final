import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth_service';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:8080/api/v1/documents';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return { Authorization: `Bearer ${this.authService.getToken()}` };
  }


  upload(loanId: number, file: File, documentType: string): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    return this.http.post<Document>(`${this.baseUrl}/upload/${loanId}`, formData, {
      headers: this.getHeaders()
    });
  }


  download(docId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${docId}`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }


  delete(docId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${docId}`, {
      headers: this.getHeaders()
    });
  }

  getByLoan(loanId: number): Observable<Document[]> {
  return this.http.get<Document[]>(`${this.baseUrl}/loan/${loanId}`, {
    headers: this.getHeaders()
  });
}


}
