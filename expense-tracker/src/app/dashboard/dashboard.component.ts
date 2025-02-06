import { Component} from '@angular/core';
import { BudgetSectionComponent } from "../budget-section/budget-section.component";
import { RecentExpensesComponent } from "../recent-expenses/recent-expenses.component";
import { ExpensesChartComponent } from "../expenses-chart/expenses-chart.component";


@Component({
  selector: 'app-dashboard',
  imports: [BudgetSectionComponent, RecentExpensesComponent, ExpensesChartComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{


}
