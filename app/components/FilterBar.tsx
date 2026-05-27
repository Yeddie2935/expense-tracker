"use client";

import { Category, ExpenseFilters } from "../types/expense";
import { Search, X } from "lucide-react";

const CATEGORIES: (Category | "All")[] = [
  "All",
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

interface Props {
  filters: ExpenseFilters;
  onChange: (f: ExpenseFilters) => void;
}

export function FilterBar({ filters, onChange }: Props) {
  function set<K extends keyof ExpenseFilters>(key: K, value: ExpenseFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function reset() {
    onChange({ search: "", category: "All", dateFrom: "", dateTo: "" });
  }

  const hasFilters =
    filters.search || filters.category !== "All" || filters.dateFrom || filters.dateTo;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search expenses…"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={filters.category}
          onChange={(e) => set("category", e.target.value as Category | "All")}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
          ))}
        </select>

        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => set("dateFrom", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => set("dateTo", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {hasFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-2 transition-colors"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
