import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExpenseDonutChartComponent } from './components/expense-donut-chart/expense-donut-chart.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, registerables, Title, Tooltip } from 'chart.js';
import { SnackbarService } from './services/snackbar.service';
Chart.register(...registerables)
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip
);


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HeaderComponent , FooterComponent,  BaseChartDirective,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'expenseapp';
}
