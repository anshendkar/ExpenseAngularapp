import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDonutChartComponent } from './expense-donut-chart.component';

describe('ExpenseDonutChartComponent', () => {
  let component: ExpenseDonutChartComponent;
  let fixture: ComponentFixture<ExpenseDonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseDonutChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
