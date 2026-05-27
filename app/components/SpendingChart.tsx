"use client";

import { Expense, Category } from "../types/expense";
import { formatCurrency } from "../utils/format";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const CATEGORY_COLORS: Record<Category, string> = {
  Food: "#f97316",
  Transportation: "#3b82f6",
  Entertainment: "#a855f7",
  Shopping: "#ec4899",
  Bills: "#ef4444",
  Other: "#6b7280",
};

interface Props {
  expenses: Expense[];
}

export function SpendingChart({ expenses }: Props) {
  // Category breakdown for pie
  const categoryTotals: Partial<Record<Category, number>> = {};
  for (const e of expenses) {
    categoryTotals[e.category] = (categoryTotals[e.category] ?? 0) + e.amount;
  }
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: value as number,
  }));

  // Last 6 months bar chart
  const now = new Date();
  const monthLabels: string[] = [];
  const monthTotals: number[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString("en-US", { month: "short" });
    monthLabels.push(label);
    const total = expenses
      .filter((e) => {
        const ed = new Date(e.date);
        return ed.getFullYear() === d.getFullYear() && ed.getMonth() === d.getMonth();
      })
      .reduce((s, e) => s + e.amount, 0);
    monthTotals.push(total);
  }
  const barData = monthLabels.map((month, i) => ({ month, amount: monthTotals[i] }));

  if (expenses.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Spending</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">By Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name as Category] ?? "#6b7280"}
                />
              ))}
            </Pie>
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
