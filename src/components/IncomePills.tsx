import { View, Text } from "react-native";
import { useExpenseStore } from "../stores/useExpenseStore";

export function IncomePills() {
  const incomes = useExpenseStore((s) => s.incomes);
  const goals = useExpenseStore((s) => s.goals);
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalGoals = goals.reduce((sum, g) => sum + g.amount, 0);
  const totalExpenses = useExpenseStore((s) => s.expenses.reduce((sum, e) => sum + e.amount, 0));

  return (
    <View className="flex-row justify-center gap-3 px-4 py-1">
      <View className="bg-zinc-800 rounded-full px-3 py-1">
        <Text className="text-emerald-400 text-xs font-medium">
          💰 ${totalIncome.toFixed(0)}
        </Text>
      </View>
      <View className="bg-zinc-800 rounded-full px-3 py-1">
        <Text className="text-blue-400 text-xs font-medium">
          🎯 -${totalGoals.toFixed(0)}
        </Text>
      </View>
      <View className="bg-zinc-800 rounded-full px-3 py-1">
        <Text className="text-red-400 text-xs font-medium">
          🔥 -${totalExpenses.toFixed(0)}
        </Text>
      </View>
    </View>
  );
}
