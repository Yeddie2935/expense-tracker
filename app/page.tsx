"use client";

import { useMemo, useState } from "react";
import { useExpenses } from "./hooks/useExpenses";
import { Expense, ExpenseFilters } from "./types/expense";
import { SummaryCards } from "./components/SummaryCards";
import { SpendingChart } from "./components/SpendingChart";
import { FilterBar } from "./components/FilterBar";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseForm } from "./components/ExpenseForm";
import { exportToCSV } from "./utils/csv";
import { Plus, Download } from "lucide-react";

export default function Home() {
  const { expenses, loaded, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [filters, setFilters] = useState<ExpenseFilters>({
    search: "",
    category: "All",
    dateFrom: "",
    dateTo: "",
  });

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (
        filters.search &&
        !e.description.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.category !== "All" && e.category !== filters.category) return false;
      if (filters.dateFrom && e.date < filters.dateFrom) return false;
      if (filters.dateTo && e.date > filters.dateTo) return false;
      return true;
    });
  }, [expenses, filters]);

  function handleEdit(expense: Expense) {
    setEditing(expense);
    setShowForm(true);
  }

  function handleFormSubmit(data: Omit<Expense, "id" | "createdAt">) {
    if (editing) {
      updateExpense(editing.id, data);
    } else {
      addExpense(data);
    }
    setEditing(null);
  }

  function handleClose() {
    setShowForm(false);
    setEditing(null);
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
            <p className="text-xs text-gray-400 mt-0.5">{expenses.length} expenses recorded</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(filtered)}
              className="flex items-center gap-1.5 border border-gray-200 text-gray-600 rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Download size={15} /> Export CSV
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus size={15} /> Add Expense
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <SummaryCards expenses={expenses} />
        <SpendingChart expenses={expenses} />
        <FilterBar filters={filters} onChange={setFilters} />
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-gray-500">
            {filtered.length} expense{filtered.length !== 1 ? "s" : ""}
            {filtered.length !== expenses.length && ` (filtered from ${expenses.length})`}
          </p>
        </div>
        <ExpenseList expenses={filtered} onEdit={handleEdit} onDelete={deleteExpense} />
      </main>

      {showForm && (
        <ExpenseForm
          onSubmit={handleFormSubmit}
          onClose={handleClose}
          initial={editing}
        />
      )}
    </div>
  );
}
