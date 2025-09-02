import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth_service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';
  phone = '';
  address = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const request = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address
    };

    console.log("Sending register request:", request);

    this.authService.register(request).subscribe({
      next: (res) => {
        console.log("Registered:", res);

        // ✅ Redirect to login page after success
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(" Registration failed:", err);
        this.error = 'Registration failed. Try again.';
      }
    });
  }
}
