"use client";

import { Expense } from "../types/expense";
import { formatCurrency } from "../utils/format";
import { TrendingUp, Calendar, DollarSign, Tag } from "lucide-react";

interface Props {
  expenses: Expense[];
}

export function SummaryCards({ expenses }: Props) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const now = new Date();
  const thisMonth = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    })
    .reduce((s, e) => s + e.amount, 0);

  const categoryTotals: Record<string, number> = {};
  for (const e of expenses) {
    categoryTotals[e.category] = (categoryTotals[e.category] ?? 0) + e.amount;
  }
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  const avg = expenses.length ? total / expenses.length : 0;

  const cards = [
    { label: "Total Spent", value: formatCurrency(total), icon: DollarSign, color: "bg-indigo-50 text-indigo-600" },
    { label: "This Month", value: formatCurrency(thisMonth), icon: Calendar, color: "bg-emerald-50 text-emerald-600" },
    { label: "Top Category", value: topCategory, icon: Tag, color: "bg-amber-50 text-amber-600" },
    { label: "Avg per Expense", value: formatCurrency(avg), icon: TrendingUp, color: "bg-rose-50 text-rose-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className={`inline-flex p-2 rounded-xl mb-3 ${color}`}>
            <Icon size={18} />
          </div>
          <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
