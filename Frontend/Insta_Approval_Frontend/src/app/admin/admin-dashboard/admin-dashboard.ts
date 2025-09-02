import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from '../../models/loan';
import { AdminService } from '../../service/admin_service';
import { AuthService } from '../../service/auth_service';
import { Document } from '../../models/document';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  loans: Loan[] = [];
  error: string | null = null;
  loanDocuments: { [loanId: number]: Document[] } = {};

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadPendingLoans();
  }

  loadPendingLoans() {
    this.adminService.getPendingLoans().subscribe({
      next: (res) => {
        console.log("Pending loans:", res, "Type:", Array.isArray(res));
        this.loans = Array.isArray(res) ? res : [];
        this.cd.detectChanges();   
      },
      error: (err) => {
        console.error(" Failed to load loans:", err);
        this.error = 'Failed to fetch pending loans';
      }
    });
  }

  approveLoan(loanId: number) {
    const remarks = prompt("Enter approval remarks:");
    if (remarks !== null) {
      this.adminService.approveLoan(loanId, remarks).subscribe({
        next: () => {
          alert("Loan approved successfully!");
          this.loadPendingLoans();
        },
        error: () => alert("Failed to approve loan")
      });
    }
  }

  rejectLoan(loanId: number) {
    const remarks = prompt("Enter rejection remarks:");
    if (remarks !== null) {
      this.adminService.rejectLoan(loanId, remarks).subscribe({
        next: () => {
          alert("Loan rejected");
          this.loadPendingLoans();
        },
        error: () => alert("Failed to reject loan")
      });
    }
  }


  viewDocuments(loanId: number) {
  const token = localStorage.getItem('token');
  console.log("Using token:", token);

  this.http.get<Document[]>(`http://localhost:8080/api/v1/documents/loan/${loanId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe(
    (res: Document[]) => {
      console.log("Docs API Response:", res);   
      this.loanDocuments[loanId] = res;
      this.cd.detectChanges();
      if (res.length === 0) {
        alert("No documents uploaded for this loan.");
      } else {
        let docsList = res.map((d: Document) => `${d.documentType || 'Unknown'}: ${d.fileName}`).join("\n");
        alert("Documents for Loan " + loanId + ":\n" + docsList);
      }
    },
    (err: any) => {
      console.error("Failed to load documents", err);
      alert("Failed to load documents for Loan " + loanId);
      this.cd.detectChanges();
    }
  );
}



  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
