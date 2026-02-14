import { create } from "zustand";
import type { Expense, Income, Goal, Card, Month } from "../types";
import { calculateAvailable } from "../utils/calculations";

interface ExpenseState {
  expenses: Expense[];
  incomes: Income[];
  goals: Goal[];
  cards: Card[];
  currentMonth: Month;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  addIncome: (income: Income) => void;
  addGoal: (goal: Goal) => void;
  setCurrentMonth: (month: Month) => void;
  getAvailableAmount: () => number;
  getMonthExpenses: () => Expense[];
  isCurrentMonth: () => boolean;
}

const now = new Date();

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [
    { id: "1", emoji: "🍔", amount: 12.5, date: new Date(now.getFullYear(), now.getMonth(), 3).toISOString() },
    { id: "2", emoji: "🚗", amount: 45.0, date: new Date(now.getFullYear(), now.getMonth(), 8).toISOString() },
    { id: "3", emoji: "🛒", amount: 67.3, date: new Date(now.getFullYear(), now.getMonth(), 14).toISOString() },
    { id: "4", emoji: "💊", amount: 23.0, date: new Date(now.getFullYear(), now.getMonth(), 20).toISOString() },
  ],
  incomes: [
    { id: "1", emoji: "💰", amount: 3200, date: now.toISOString(), isRecurring: true },
    { id: "2", emoji: "💻", amount: 500, date: now.toISOString() },
  ],
  goals: [
    { id: "1", name: "Emergency Fund", amount: 400, color: "#3B82F6" },
    { id: "2", name: "Vacation", amount: 200, color: "#F59E0B" },
  ],
  cards: [
    { id: "1", name: "Main Card", color: "#1E40AF" },
    { id: "2", name: "Savings", color: "#059669" },
  ],
  currentMonth: { year: now.getFullYear(), month: now.getMonth() + 1 },

  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),

  removeExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),

  updateExpense: (id, updates) =>
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),

  addIncome: (income) =>
    set((state) => ({ incomes: [...state.incomes, income] })),

  addGoal: (goal) =>
    set((state) => ({ goals: [...state.goals, goal] })),

  setCurrentMonth: (month) => set({ currentMonth: month }),

  getAvailableAmount: () => {
    const { incomes, goals, expenses, currentMonth } = get();
    return calculateAvailable(incomes, goals, expenses, currentMonth);
  },

  getMonthExpenses: () => {
    const { expenses, currentMonth } = get();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return (
          d.getUTCFullYear() === currentMonth.year &&
          d.getUTCMonth() + 1 === currentMonth.month
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  isCurrentMonth: () => {
    const { currentMonth } = get();
    const today = new Date();
    return (
      currentMonth.year === today.getFullYear() &&
      currentMonth.month === today.getMonth() + 1
    );
  },
}));
