export interface Customer {
  customerId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  cibilScore: number;
  registrationDate: string; // ISO date from backend
}
