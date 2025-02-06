import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseEntryFormComponent } from "./expense-entry-form/expense-entry-form.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expense-tracker';
}
