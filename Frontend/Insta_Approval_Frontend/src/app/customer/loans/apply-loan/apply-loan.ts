import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth_service';
import { LoanService } from '../../../service/loanservice';


@Component({
  selector: 'app-apply-loan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-loan.html',
  styleUrls: ['./apply-loan.css']
})
export class ApplyLoan {
  loanAmount: number = 0;
  loanTypeId: number = 0;
  remarks: string = '';
  error: string | null = null;

  constructor(
    private loanService: LoanService,
    private authService: AuthService,
    private router: Router
  ) {}

  applyLoan() {
    const customerId = this.authService.getCustomerId();
    if (!customerId) {
      this.error = 'Please login again.';
      return;
    }

    const request = {
      loanAmount: this.loanAmount,
      loanTypeId: this.loanTypeId,
      remarks: this.remarks
    };

    this.loanService.applyLoan(customerId, request).subscribe({
      next: () => {
        alert('Loan applied successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Failed to apply loan.';
      }
    });
  }
}