import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-info'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
