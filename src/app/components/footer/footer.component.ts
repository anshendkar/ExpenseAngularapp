import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private authService : AuthService) {}
  isAuthenticated: boolean = false;
  currentYear: number = new Date().getFullYear();


  ngOnInit(): void {
    // Subscribe to the authentication state
    this.authService.getAuthState().subscribe((state: boolean) => {
      this.isAuthenticated = state;
    });

    // Set the initial state
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  
}
