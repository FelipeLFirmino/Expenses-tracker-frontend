import { Component, inject, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ExpenseData } from '../expense-entry-form/expenseData.model';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-expenses-chart',
  imports: [BaseChartDirective],
  standalone: true,
  templateUrl: './expenses-chart.component.html',
  styleUrl: './expenses-chart.component.css'
})
export class ExpensesChartComponent implements OnInit {



  // Chart variables 
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public barChartLabels: string[] = []; // Labels for the X-axis (months)

  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Expenses per Month',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  public barChartType: ChartType = 'bar';

  // Injecting the service to fetch data
  ApiService = inject(ApiService);


  //when the component is initited run this 
  ngOnInit() {
    this.loadExpenses();
  }

  //this function calls the http request from the server to get all the expenses from an user 
  loadExpenses() {
    this.ApiService.getUserExpenses('2').subscribe(
      (data) => {
        this.processData(data); // Ensure data processing happens here
      }
    );
  }

  processData(expensesData:ExpenseData[]) {
    // An object to store monthly expenses: month -> total amount
    const monthlyExpenses: { [key: string]: number } = {};
  
    expensesData.forEach(expense => {
      // Parse the date string into a Date object
      const date = new Date(expense.date);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return; // Skip this expense if the date is invalid
      }
  
      // Format the date to the full month name (e.g., "February")
      const month = date.toLocaleString('en-US', { month: 'long' });
  
      // Initialize the month's total if it doesn't exist
      if (!monthlyExpenses[month]) {
        monthlyExpenses[month] = 0;
      }
  
      // Add the expense amount to the month's total
      monthlyExpenses[month] += expense.amount;
    });
  
  
    // Update chart labels and data
    this.barChartLabels = Object.keys(monthlyExpenses);
  
    // Replace the entire object to trigger change detection
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: Object.values(monthlyExpenses),
          label: 'Expenses per Month',
          backgroundColor: 'rgba(13, 167, 34, 0.2)',
          borderColor: 'rgb(19, 133, 5)',
          borderWidth: 1
        }
      ]
    };
  }



}