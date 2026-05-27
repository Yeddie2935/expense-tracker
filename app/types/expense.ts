export type Category =
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Shopping"
  | "Bills"
  | "Other";

export interface Expense {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  amount: number;
  category: Category;
  description: string;
  createdAt: string;
}

export interface ExpenseFilters {
  search: string;
  category: Category | "All";
  dateFrom: string;
  dateTo: string;
}
