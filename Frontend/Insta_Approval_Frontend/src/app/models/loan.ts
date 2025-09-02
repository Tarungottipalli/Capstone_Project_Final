export interface Loan {
  applicationId: number;
  customerId: number;
  loanTypeId: number;
  loanAmount: number;
  applicationDate: string; // ISO date
  status: string;
  remarks: string;

customer: {
    customerId: number;
    name: string;
    email: string;
  };

  loanType: {
    loanTypeId: number;
    name: string;
  };
}

export interface LoanResponse {
  applicationId: number;
  customerId: number;
  loanTypeId: number;
  loanAmount: number;
  applicationDate: string;
  status: string;
  remarks: string;
}