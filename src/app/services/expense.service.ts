import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:8080/api/expenses'; 

  constructor(private router: Router , private http : HttpClient) { }


  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/`);
  }

  addExpense(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, formData);
}


  deleteExpense(expenseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${expenseId}`);
  }

  viewExpense(expenseId: number , userid : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${expenseId}/${userid}/view`, {
      responseType: 'blob',
    });
  }

  downloadExpenseFile(expenseId: number, userid: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${expenseId}/${userid}/download`, {
      responseType: 'blob', // Expecting a blob (binary) response
    });
  }

  getExpenseById(expenseId: number, userid: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${expenseId}/${userid}`);
  }

  updateExpense(expenseId: number, userid: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${expenseId}/${userid}`, formData);
  }

  getUserSummary(userid: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary/${userid}`);
  }
  getCategoryWiseSummary(userId: number) {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/summary/by-category/${userId}`);
  }



}