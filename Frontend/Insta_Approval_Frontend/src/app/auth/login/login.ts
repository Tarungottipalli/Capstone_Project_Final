import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth_service';
import {  Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log("Login response:", res);
        this.authService.saveLoginData(res);

        if (res.role === 'CUSTOMER') {
          this.router.navigate(['/dashboard']);
        } else if (res.role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);;
        }
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }
}
