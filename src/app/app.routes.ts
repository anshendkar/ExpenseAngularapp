import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
  { path: 'full', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add-expense',
    component: AddExpenseComponent,
    canActivate: [authGuard]
  },
  {
    path: 'update/:expenseId/:userid',
    component: UpdateExpenseComponent,
    canActivate: [authGuard]
  }
];
