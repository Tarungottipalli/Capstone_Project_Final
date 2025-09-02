import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-loan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-loan.html',
  styleUrls: ['./edit-loan.css']
})
export class EditLoan implements OnInit {
  loanId: number | null = null;
  loanRequest: any = { loanTypeId: null, loanAmount: '', remarks: '' };
  loanTypes: any[] = []; 
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loanId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLoan();
    this.loadLoanTypes();   
  }

  loadLoan() {
    const token = localStorage.getItem('token');
    if (!this.loanId || !token) return;

    this.http
      .get<any>(`http://localhost:8080/api/v1/customers/loans/${this.loanId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .subscribe({
        next: (res) => {
          console.log('EditLoan API response:', res);

          this.loanRequest = {
            loanTypeId: res.loanTypeId,
            loanAmount: res.loanAmount,
            remarks: res.remarks
          };

          this.cd.detectChanges();
        },
        error: (err) => {
          console.error(' Failed to load loan', err);
          this.error = 'Failed to load loan details.';
          this.cd.detectChanges();
        }
      });
  }

  loadLoanTypes() {
    const token = localStorage.getItem('token');
    this.http
      .get<any[]>('http://localhost:8080/api/v1/loan-types', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .subscribe({
        next: (res) => {
          this.loanTypes = res;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load loan types', err);
        }
      });
  }

  updateLoan() {
    if (!this.loanId) return;

    const token = localStorage.getItem('token');
    this.http
      .put<any>(
        `http://localhost:8080/api/v1/customers/loans/${this.loanId}`,
        this.loanRequest,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .subscribe({
        next: () => {
          alert('Loan updated successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(' Failed to update loan', err);
          this.error = ' Failed to update loan.';
          this.cd.detectChanges();
        }
      });
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
