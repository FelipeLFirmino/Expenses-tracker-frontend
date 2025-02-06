import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseData } from '../expense-entry-form/expenseData.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //injecting the http client service
  private httpClient = inject(HttpClient);
  //URL path to the backend
  private apiURL = 'http://localhost:8080';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/urlencoded' }),
  };

  //function that makes a request to the backend it returns a user through his id
  getUser(userId: string): Observable<any|User> {
    return this.httpClient.get(`${this.apiURL}/getuser?id=${userId}`);
  }

  //function that makes a request to the backend it returns a user expenses through his id
  getUserExpenses(userId: string): Observable<any> {
    return this.httpClient.get(
      `${this.apiURL}/getuser/getuserexpenses?id=${userId}`
    );
  }

  //Adds an expense to the specific user 
  addExpense(newExpense: ExpenseData) {
     var body = {
      userid: newExpense.userId,
      category: newExpense.category,
      amount: newExpense.amount,
      date: newExpense.date,
      description: newExpense.description,
    };
    return this.httpClient.post(
      `${this.apiURL}/addexpense?id=${newExpense.userId}`,
      body,this.httpOptions
    );
  }

//returns an array with the last five expenses of the user, the quantity of expenses returned is hardcoded on the backend
  getLatestExpenses(userId: string): Observable<any>{
    return this.httpClient.get(
      `${this.apiURL}/lastfiveexpenses?id=${userId}`
    );

  }
}
