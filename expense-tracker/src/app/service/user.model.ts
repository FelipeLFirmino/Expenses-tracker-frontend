import { ExpenseData } from "../expense-entry-form/expenseData.model";

export type User = {
    id: string;            
    name: string;        
    email: string;           
    budget: number;          
    expenses: ExpenseData[];     
  }
  