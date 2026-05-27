"use client";

import { useState, useEffect, useCallback } from "react";
import { Expense, Category } from "../types/expense";

const STORAGE_KEY = "expense-tracker-data";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const SEED_DATA: Expense[] = [
  { id: generateId(), date: "2026-05-01", amount: 42.5, category: "Food", description: "Grocery run", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-03", amount: 12.0, category: "Transportation", description: "Subway monthly top-up", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-05", amount: 89.99, category: "Shopping", description: "New headphones", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-08", amount: 25.0, category: "Entertainment", description: "Movie tickets", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-10", amount: 120.0, category: "Bills", description: "Electric bill", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-12", amount: 18.75, category: "Food", description: "Lunch with coworkers", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-15", amount: 55.0, category: "Shopping", description: "Clothing", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-18", amount: 9.99, category: "Entertainment", description: "Streaming subscription", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-20", amount: 34.0, category: "Food", description: "Dinner out", createdAt: new Date().toISOString() },
  { id: generateId(), date: "2026-05-22", amount: 200.0, category: "Bills", description: "Rent partial", createdAt: new Date().toISOString() },
];

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setExpenses(JSON.parse(stored));
    } else {
      setExpenses(SEED_DATA);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses, loaded]);

  const addExpense = useCallback(
    (data: Omit<Expense, "id" | "createdAt">) => {
      const expense: Expense = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setExpenses((prev) => [expense, ...prev]);
    },
    []
  );

  const updateExpense = useCallback(
    (id: string, data: Omit<Expense, "id" | "createdAt">) => {
      setExpenses((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...data } : e))
      );
    },
    []
  );

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { expenses, loaded, addExpense, updateExpense, deleteExpense };
}
