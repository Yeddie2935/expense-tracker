"use client";

import { Expense } from "../types/expense";
import { formatCurrency, formatDate } from "../utils/format";
import { CategoryBadge } from "./CategoryBadge";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  expenses: Expense[];
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-400 text-sm">No expenses found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <span>Description</span>
        <span>Category</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
        <span />
      </div>

      <ul className="divide-y divide-gray-50">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-2 md:gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{expense.description}</p>
              <p className="text-xs text-gray-400 md:hidden mt-0.5">
                {formatDate(expense.date)} · {expense.category}
              </p>
            </div>
            <div className="hidden md:block">
              <CategoryBadge category={expense.category} />
            </div>
            <span className="hidden md:block text-sm text-gray-500">{formatDate(expense.date)}</span>
            <span className="text-sm font-semibold text-gray-900 md:text-right">
              {formatCurrency(expense.amount)}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(expense)}
                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(expense.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
