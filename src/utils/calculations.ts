import type { Expense, Income, Goal, Month } from "../types";

export function calculateAvailable(
  incomes: Income[],
  goals: Goal[],
  expenses: Expense[],
  month: Month
): number {
  const monthExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === month.year && d.getMonth() + 1 === month.month;
  });
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalGoals = goals.reduce((sum, g) => sum + g.amount, 0);
  const totalExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  return totalIncome - totalGoals - totalExpenses;
}

export function getAmountColor(
  available: number,
  totalIncome: number
): string {
  if (totalIncome === 0) return "#22C55E";
  const ratio = available / totalIncome;
  if (ratio >= 0.5) return "#22C55E";
  if (ratio >= 0.25) return "#EAB308";
  if (ratio >= 0.1) return "#EF4444";
  if (ratio >= 0) return "#A855F7";
  return "#7C3AED";
}
