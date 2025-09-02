import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Customer } from '../../models/customer';
import { Loan } from '../../models/loan';
import { AuthService } from '../../service/auth_service';
import { LoanService } from '../../service/loanservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  customer: Customer | null = null;
  loans: Loan[] = [];
  error: string | null = null;

  constructor(private authService: AuthService, private loanService: LoanService,private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCustomer();
    this.loadLoans();
  }

  loadCustomer() {
    const customerId = this.authService.getCustomerId();
    if (!customerId) return;

    this.loanService.getCustomer(customerId).subscribe({
      next: (res) => (this.customer = res),
      error: () => (this.error = ' Failed to load customer profile')
    });
  }

  loadLoans() {
  const customerId = this.authService.getCustomerId();
  if (!customerId) return;

  this.loanService.getLoans(customerId).subscribe({
    next: (res) => {
      console.log("Loans loaded:", res, "Type:", Array.isArray(res));
      this.loans = Array.isArray(res) ? res : [];  // force as array
      this.cd.detectChanges(); // 🔥 force Angular to refresh view
    },
    error: (err) => {
      console.error(" Failed to load loans:", err);
    }
  });
}


  cancelLoan(loanId: number) {
    if (confirm('Are you sure you want to cancel this loan?')) {
      this.loanService.cancelLoan(loanId.toString()).subscribe({
        next: () => {
          alert(' Loan cancelled successfully');
          this.loadLoans();
        },
        error: () => alert(' Failed to cancel loan')
      });
    }
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
