import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMsg = '';
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.isLoading = true;
    this.errorMsg = '';

    const registerData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:5148/api/Auth/register', registerData)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          alert('Registration successful! Please login.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error || 'Registration failed.';
          console.error(err);
        }
      });
  }
}