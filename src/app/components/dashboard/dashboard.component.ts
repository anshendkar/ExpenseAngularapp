import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Expense } from '../../model/expense';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ExpenseDonutChartComponent } from '../expense-donut-chart/expense-donut-chart.component';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule , MatButtonModule , FormsModule, ReactiveFormsModule ,CapitalizePipe,  MatIconModule ,ExpenseDonutChartComponent , BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    expenses: Expense[] = [];
    paginatedExpenses: Expense[] = [];
    filteredExpenses: Expense[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 5; // Number of items per page
    totalPages: number = 0;
    pages: number[] = []; // List of page numbers
    summary: any = { totalExpenses: 0, totalAmountSpent: 0 };
    userdata: { userid: number ; firstname: string; lastname: string } | null = null;

    lineChartData: ChartData<'line'> = {
      labels: [],
      datasets: []
    };
    constructor(private expenseService: ExpenseService , private router: Router) {}
  
    ngOnInit(): void {
      this.loadExpenses();

    }
  
    loadExpenses() {
      this.expenseService.getExpenses().subscribe(data => {
        this.expenses = data;
        debugger
        if (this.expenses.length > 0) {
          this.userdata = this.expenses[0].userdata; // Assign userdata globally
          this.loadSummary();
        }  
        console.log(data);
      this.filteredExpenses = [...this.expenses];
      this.calculateSummary();
      this.calculatePagination();
      this.updatePaginatedExpenses();

      });
    }
    
    loadSummary(): void {
      const userid = this.expenses.length > 0 ? this.expenses[0].userdata.userid : null;
      if (userid) {
        debugger;
        this.expenseService.getUserSummary(userid).subscribe((data) => {
          this.summary = data;
        });
      } else {
        console.error('User ID not available');
      }
    }
    filterByDate(event: any): void {
      const selectedDate = new Date(event.target.value);
    
      this.filteredExpenses = this.expenses.filter((expense) => {
        const expenseDate = new Date(expense.date); // Ensure proper date conversion
        return expenseDate <= selectedDate;
      });
    
      console.log('Filtered Expenses:', this.filteredExpenses);
    
      // Refresh summary, pagination, and table data
      this.calculateSummary();
      this.calculatePagination();
      this.updatePaginatedExpenses();
      this.updateLineChart();
    }
    
    updatePaginatedExpenses(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedExpenses = this.filteredExpenses.slice(startIndex, endIndex);
      this.updateLineChart();
    }
    lineChartOptions: ChartOptions<'line'> = {
      responsive: true,
  maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Amount'
          }
        }
      }
    };
  
    calculateSummary(): void {
      // Recalculate total expenses and total amount spent
      this.summary.totalExpenses = this.filteredExpenses.length;
      this.summary.totalAmountSpent = this.filteredExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
    }
  
    calculatePagination() {
      this.totalPages = Math.ceil(this.expenses.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
    goToPage(page: number) {
      this.currentPage = page;
      this.updatePaginatedExpenses();
    }
  
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedExpenses();
      }
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedExpenses();
      }
    }
    viewExpense(expenseId: number, userId: number) {
      this.expenseService.viewExpense(expenseId, userId).subscribe(
        (response) => {
          const blob = new Blob([response], { type: response.type }); // Use dynamic MIME type
          const url = window.URL.createObjectURL(blob);
          window.open(url); // Opens the image in a new tab or window
        },
        (error) => {
          alert('Error while viewing the file');
        }
      );
    }

    downloadFile(expenseId: number, userId: number) {
      this.expenseService.downloadExpenseFile(expenseId, userId).subscribe(
        (response) => {
          const fileName = this.expenses.find(expense => expense.expenseId === expenseId)?.filename || 'download';
    
          // Create a link element to trigger the download
          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(response);
          a.download = fileName;
          a.click();
    
          window.URL.revokeObjectURL(a.href); // Clean up the URL
        },
        (error) => {
          alert('Error while downloading the file');
        }
      );
    }

    editExpense(expenseId: number, userId: number) {
      this.router.navigate([`/update/${expenseId}/${userId}`]);
    }
    
    

  deleteExpense(expense: any) {
    console.log('Delete Expense:', expense);
  }

  updateLineChart(): void {
    const grouped = new Map<string, number>();
    this.filteredExpenses.forEach(expense => {
      const date = new Date(expense.date).toISOString().split('T')[0];
      grouped.set(date, (grouped.get(date) || 0) + expense.amount);
    });

    const labels = Array.from(grouped.keys()).sort();
    const data = labels.map(date => grouped.get(date)!);

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Expenses Over Time',
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.3
        }
      ]
    };
  }
}
