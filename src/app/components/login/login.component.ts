import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { User } from '../../model/user';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , MatFormFieldModule , ReactiveFormsModule , MatCardModule , MatInputModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  user: User = { firstname: '', lastname: '', email: '', password: '' };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.authService.updateAuthState(true);
          this.snackbarService.showSuccess('User login successfully!');
          this.router.navigate(['/dashboard']); // Redirect after login
        },
        error: (err) => {
          this.snackbarService.showError('Invalid credentials. Please try again.');
        }
      });
    }
  }

  register(): void {
    this.router.navigate(['/register']);
  }
  
}