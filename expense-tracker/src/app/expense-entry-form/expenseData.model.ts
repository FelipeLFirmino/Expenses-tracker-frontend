export type ExpenseData = {
    //the id is optional since its defined in the database
 id?:string
 userId: string
 description: string
 amount: number
 category: string
 date: string
 note: string | null
};