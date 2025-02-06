import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ExpenseEntryFormComponent } from '../expense-entry-form/expense-entry-form.component';
import { ApiService } from '../service/api.service';
import { User } from '../service/user.model';
import { UserServiceService } from '../service/user-service.service';
import { ExpenseData } from '../expense-entry-form/expenseData.model';

@Component({
  selector: 'app-budget-section',
  imports: [CurrencyPipe, ExpenseEntryFormComponent],
  standalone: true,
  templateUrl: './budget-section.component.html',
  styleUrl: './budget-section.component.css',
})
export class BudgetSectionComponent implements OnInit {
  //initializing the variable that is going to be filled with the data of the user coming from the backend.
  //if the data can not be fetched the user data will be undefined
  user!: User;

  //initializing the variable that is going to be filled with the data of the user expenses coming from the backend.
  //if the data can not be fetched the expenses data will be undefined
  userExpenses!: ExpenseData[];
  totalExpenses!: number;
  remainingBudget!: number;
  //this variable is used to control the state of the template, so the user data is just loaded after the request response
  isUserLoading: boolean = true;

  //this boolean variable is used to show the form that adds expenses
  isAddingExpense: boolean = false;

  //injecting the services needed
  apiService = inject(ApiService);
  userService = inject(UserServiceService);

  //when the component lifecycle initiates this will happen
  ngOnInit(): void {
    //request using the api service, getting an user through his/her id and then feeding the data to our user variable
    this.apiService.getUser('2').subscribe((data) => {
      this.user = data;
    });

    //request using the api service, getting an user expenses through his/her id and then feeding the data to our user variable
    this.apiService
      .getUserExpenses('2')
      .subscribe((data) => {
        this.userExpenses = data;
        //calculates the total expenses for the current usere
        this.totalExpenses = this.userService.calculateTotalExpenses(
          this.userExpenses
        );
        //calculate the remaining budget for the user
        this.remainingBudget = this.userService.calculateRemainingBudget(
          this.user.budget,
          this.totalExpenses
        );
        //sets the state of loeading to false so we can load the part of the template that has data
        this.isUserLoading = false;
      });
  }

  //this functions manipulate the variable that shows the form for adding an expense
  onAddExpense() {
    this.isAddingExpense = true;
  }
  OnCancelAddingExpense() {
    this.isAddingExpense = false;
  }
}
