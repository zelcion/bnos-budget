import { View } from "react-native";
import { useExpenseStore } from "../stores/useExpenseStore";
import { getAmountColor } from "../utils/calculations";

export function BudgetProgressBar() {
  const incomes = useExpenseStore((s) => s.incomes);
  const expenses = useExpenseStore((s) => s.expenses);
  const goals = useExpenseStore((s) => s.goals);
  const currentMonth = useExpenseStore((s) => s.currentMonth);
  const available = useExpenseStore((s) => s.getAvailableAmount());

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const borderColor = getAmountColor(available, totalIncome);

  // Filter expenses to current month, excluding planned ones from "spent"
  const monthExpenses = expenses.filter((e) => {
    if (e.isPlanned) return false;
    const d = new Date(e.date);
    return (
      d.getFullYear() === currentMonth.year &&
      d.getMonth() + 1 === currentMonth.month
    );
  });
  const totalSpent = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Planned expenses (isPlanned flag)
  const totalPlanned = expenses
    .filter((e) => e.isPlanned)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalGoals = goals.reduce((sum, g) => sum + g.amount, 0);

  // Calculate percentages (guard against zero income)
  const total = Math.max(totalIncome, 1);
  const spentPct = Math.min((totalSpent / total) * 100, 100);
  const plannedPct = Math.min(
    (totalPlanned / total) * 100,
    100 - spentPct
  );
  const goalsPct = Math.min(
    (totalGoals / total) * 100,
    100 - spentPct - plannedPct
  );

  return (
    <View
      className="h-2 rounded bg-[#27272a] overflow-hidden flex-row mx-4 my-[6] border"
      style={{ borderColor }}
    >
      {/* Spent (red) */}
      {spentPct > 0 && (
        <View
          className="h-full bg-[#EF4444]"
          style={{ width: `${spentPct}%` }}
        />
      )}
      {/* Planned (light orange) */}
      {plannedPct > 0 && (
        <View
          className="h-full bg-[#FB923C]"
          style={{ width: `${plannedPct}%` }}
        />
      )}
      {/* Goals (light green) */}
      {goalsPct > 0 && (
        <View
          className="h-full bg-[#86EFAC]"
          style={{ width: `${goalsPct}%` }}
        />
      )}
      {/* Rest is empty/available - shows as the dark background */}
    </View>
  );
}
