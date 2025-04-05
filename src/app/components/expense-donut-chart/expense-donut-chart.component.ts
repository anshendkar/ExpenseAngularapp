import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Expense } from '../../model/expense';

@Component({
  selector: 'app-expense-donut-chart',
  standalone: true,
  imports: [CommonModule , BaseChartDirective],
  templateUrl: './expense-donut-chart.component.html',
  styleUrl: './expense-donut-chart.component.scss'
})

export class ExpenseDonutChartComponent {

  @Input() filteredExpenses : Expense[] = [];

  public donutChartType: ChartType = 'doughnut';

  public chartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filteredExpenses'] && this.filteredExpenses) {
      this.updateChartData();
    }
  }

  updateChartData(): void {
    const categoryMap = new Map<string, number>();

    this.filteredExpenses.forEach(exp => {
      const category = exp.category;
      const amount = exp.amount;

      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category)! + amount);
      } else {
        categoryMap.set(category, amount);
      }
    });

    const labels = Array.from(categoryMap.keys());
    const data = Array.from(categoryMap.values());

    // Immutable object replacement to trigger chart update
    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    };
  }
}