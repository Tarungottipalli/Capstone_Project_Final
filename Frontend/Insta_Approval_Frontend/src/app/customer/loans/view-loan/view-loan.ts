import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoanResponse } from '../../../models/loan';
import { Document } from '../../../models/document';
import { DocumentService } from '../../../service/document_service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-loan',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterModule],
  templateUrl: './view-loan.html',
  styleUrls: ['./view-loan.css']
})
export class ViewLoan implements OnInit {
  loan: LoanResponse | null = null;
  error: string | null = null;
  loanId: number | null = null;

 
  documents: Document[] = [];
  docType: string = '';

  selectedFile: File | null = null;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private documentService: DocumentService,
     private cd: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.loanId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.loanId) {
      this.loadLoan();
      this.loadDocuments(); // load documents on init
    }
  }

  
 loadLoan() {
  const token = localStorage.getItem('token');
  this.http.get<LoanResponse>(`http://localhost:8080/api/v1/customers/loans/${this.loanId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: (res) => {
      console.log("Loaded loan:", res); 
      this.loan = res;
      this.cd.detectChanges(); 
    },
    error: (err) => {
      console.error("Failed to load loan", err);
      this.error = 'Failed to load loan details.';
      this.cd.detectChanges(); 
    }
  });
}

  cancelLoan() {
    if (!this.loanId) return;
    const token = localStorage.getItem('token');
    if (confirm('Are you sure you want to cancel this loan?')) {
      this.http
        .delete(`http://localhost:8080/api/v1/customers/loans/${this.loanId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .subscribe({
          next: () => {
            alert('Loan cancelled.');
            this.router.navigate(['/dashboard']);
          },
          error: () => alert('Failed to cancel loan.')
        });
    }
  }

  loadDocuments() {
    if (!this.loanId) return;
    this.documentService.getByLoan(this.loanId).subscribe({
      next: (res) => (this.documents = res),
      error: () => (this.documents = [])
    });
  }
  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}

uploadDocument() {
  if (!this.selectedFile || !this.loanId) return;
  this.documentService.upload(this.loanId, this.selectedFile, this.docType).subscribe({
    next: (doc) => {
      alert('Document uploaded!');
      this.documents.push(doc);
      this.docType = '';
      this.selectedFile = null;
    },
    error: () => alert('Failed to upload document')
  });
}



  downloadDocument(docId: number) {
    this.documentService.download(docId).subscribe({
      next: (blob: Blob | MediaSource) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document-${docId}`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('Failed to download document')
    });
  }

  deleteDocument(docId: number) {
    this.documentService.delete(docId).subscribe({
      next: () => {
        alert('Document deleted!');
        this.documents = this.documents.filter(d => d.documentId !== docId);
      },
      error: () => alert('Failed to delete document')
    });
  }
}


