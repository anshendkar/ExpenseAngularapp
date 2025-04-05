import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-update-expense',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.scss'
})
export class UpdateExpenseComponent {
  updateExpenseForm!: FormGroup;
  expenseId!: number;
  userid!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router
  ) {}


  ngOnInit(): void {
    debugger;
    this.expenseId = +this.route.snapshot.paramMap.get('expenseId')!;
    this.route.paramMap.subscribe((params) => {
      this.userid = +params.get('userid')!;
      console.log('User ID:', this.userid); // Verify the retrieved value
    });
    this.updateExpenseForm = this.fb.group({
      description: [''],
      amount: [''],
      category: [''],
      file: [null],
    });

    // Load expense data
    this.loadExpense();

  
  }

  loadExpense(): void {
    this.expenseService.getExpenseById(this.expenseId, this.userid).subscribe((expense) => {
      console.log(expense)
      this.updateExpenseForm.patchValue({
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
        file: null, // No file upload for now
      });
    });
  }

  saveExpense(): void {
    const formData = new FormData();
  formData.append('description', this.updateExpenseForm.get('description')?.value);
  formData.append('amount', this.updateExpenseForm.get('amount')?.value);
  formData.append('category', this.updateExpenseForm.get('category')?.value);

  const fileControl = this.updateExpenseForm.get('file')?.value;
  if (fileControl) {
    formData.append('file', fileControl);
  }

  this.expenseService.updateExpense(this.expenseId, this.userid, formData).subscribe(
    () => {
      alert('Expense updated successfully!');
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      alert('Error updating the expense!');
    }
  );
}
onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.updateExpenseForm.patchValue({ file: file });
  }
}


  cancel(): void {
    this.router.navigate(['/dashboard']);
  }



}
