import { Injectable } from '@angular/core';
import { User } from './user.model';
import { ExpenseData } from '../expense-entry-form/expenseData.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


 //function that calculates an user total expenses 
calculateTotalExpenses(currentUserExpenses:ExpenseData[]): number{
  return currentUserExpenses.reduce((sum,expense) => sum + expense.amount, 0 )
}

//function that calculates an user remaining budget
calculateRemainingBudget(currentuserBudget:number ,totalExpenses: number): number{
  return currentuserBudget - totalExpenses
}

}
