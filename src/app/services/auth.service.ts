import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Update this as per your backend
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());


  constructor(private http: HttpClient , private router : Router) {}

  // Login method - expects email & password, returns JWT token
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  register(user: { firstname: string; lastname: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authState.next(false);
    this.router.navigate(['login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Observable for authentication state
  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  updateAuthState(isLoggedIn: boolean): void {
    this.authState.next(isLoggedIn); // Update auth state dynamically
  }
}