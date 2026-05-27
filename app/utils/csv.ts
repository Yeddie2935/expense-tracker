import { Expense } from "../types/expense";
import { formatDate } from "./format";

export function exportToCSV(expenses: Expense[]): void {
  const header = ["Date", "Category", "Description", "Amount"];
  const rows = expenses.map((e) => [
    formatDate(e.date),
    e.category,
    `"${e.description.replace(/"/g, '""')}"`,
    e.amount.toFixed(2),
  ]);

  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
