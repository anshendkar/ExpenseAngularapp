import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , MatError, MatFormFieldModule , MatInputModule , ReactiveFormsModule , MatCardModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router , private authService: AuthService , private snackbarService: SnackbarService) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      this.authService.register(user).subscribe({
        next: (response) => {
          this.snackbarService.showSuccess('User Registered successfully!');
          this.router.navigate(['/login']); // Redirect to login after registration
        },
        error: (error) => {
          this.snackbarService.showError('Registration Failed. Please try again..');
        }
      });
    }
  }

  login() {
    this.router.navigate(['/login']);
  }
}