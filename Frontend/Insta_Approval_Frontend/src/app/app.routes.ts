import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './customer/dashboard/dashboard';
import { ApplyLoan } from './customer/loans/apply-loan/apply-loan';
import { ViewLoan } from './customer/loans/view-loan/view-loan';
import { EditLoan } from './customer/loans/edit-loan/edit-loan';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';

export const routes: Routes = [

  {path:'',component:LandingPage},
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },

  {path:'apply-loan',component:ApplyLoan},
  { path: 'view-loan/:id', component: ViewLoan },
  { path: 'edit-loan/:id', component: EditLoan },
  
  { path: 'admin-dashboard', component: AdminDashboard }

];
