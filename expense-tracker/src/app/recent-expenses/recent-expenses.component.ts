import { Component, inject } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ExpenseData } from '../expense-entry-form/expenseData.model';
import { DatePipe,CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-recent-expenses',
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './recent-expenses.component.html',
  styleUrl: './recent-expenses.component.css'
})
export class RecentExpensesComponent {

lastExpenses!: ExpenseData[];

 //injecting the service  
apiService = inject(ApiService)

 //when the component lifecycle initiates this will happen
 ngOnInit(): void {
  //request using the api service, getting an user through his/her id and then feeding the data to our user variable
  this.apiService.getLatestExpenses('2').subscribe((data) => {
    this.lastExpenses = data 
    console.log("these are the last expenses: "+ this.lastExpenses);
    
  });
  }
}
