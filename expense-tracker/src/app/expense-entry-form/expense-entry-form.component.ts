import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ExpenseData } from './expenseData.model';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';
import { ApiService } from '../service/api.service';
import { User } from '../service/user.model';

@Component({
  selector: 'app-expense-entry-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './expense-entry-form.component.html',
  styleUrl: './expense-entry-form.component.css',
})
export class ExpenseEntryFormComponent {
  //injecting the service
  userService = inject(UserServiceService);
  apiService = inject(ApiService);

  //data using two way binding
  formDescription: string = '';
  formAmount: number = 0;
  formDate: string = '';
  formCategory: string = '';
  formNote: string = '';

  //Outputs that the cancel button from the form has been clicked
  @Output() cancel = new EventEmitter<void>();

  //emits the output that the button has been clicked to the parent component
  onCancelAddExpense() {
    this.cancel.emit();
  }

  onSubmit() {
    //get user function is using an hardcoded user
    this.apiService.getUser('2').subscribe(
      (data) => {
        var user: User = data;
        //initializing an object of type expense data
        var expenseData: ExpenseData = {
          userId: user.id,
          amount: this.formAmount,
          description: this.formDescription,
          category: this.formCategory,
          date: this.formDate,
          note: this.formNote,
        };
        // SUBSCRIBE to addExpense() to actually execute the POST request
        this.apiService.addExpense(expenseData).subscribe({
          next: (response) => {
            console.log('Expense added successfully:', response);
          },
          error: (error) => {
            console.error('Error adding expense:', error);
          },
        });
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
    this.onCancelAddExpense()
  }




  
}
