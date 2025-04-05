import { Component } from '@angular/core';
import { Expense } from '../../model/expense';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule , MatInputModule, CommonModule , FormsModule , ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})

export class AddExpenseComponent {

  expenseForm: FormGroup;
  isEditMode: boolean = false;
  selectedExpenseId: number | null = null;

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private fb: FormBuilder,
    private snackBarService : SnackbarService
  ) {
    this.expenseForm = this.fb.group({
      description: [''],
      amount: [''],
      category: [''],
      file: [null],
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.expenseForm.patchValue({ file: file });
    }
  }

  addExpense() {
    const formData = new FormData();
    formData.append('description', this.expenseForm.get('description')?.value);
    formData.append('amount', this.expenseForm.get('amount')?.value);
    formData.append('category', this.expenseForm.get('category')?.value);
    const fileControl = this.expenseForm.get('file')?.value;
    if (fileControl) {
      formData.append('file', fileControl);
    }
  

    this.expenseService.addExpense(formData).subscribe(() => {
      this.snackBarService.showSuccess("Expense added successfully..!");
      this.router.navigate(['/dashboard']); // Redirect to the expenses page
    });
  }
  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
