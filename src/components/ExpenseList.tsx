import { View, Text, FlatList } from "react-native";
import { useExpenseStore } from "../stores/useExpenseStore";
import { ExpenseItem } from "./ExpenseItem";

export function ExpenseList() {
  const expenses = useExpenseStore((s) => s.expenses);
  const currentMonth = useExpenseStore((s) => s.currentMonth);

  const monthExpenses = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getUTCFullYear() === currentMonth.year && d.getUTCMonth() + 1 === currentMonth.month;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (monthExpenses.length === 0) {
    return (
      <View className="items-center py-12">
        <Text className="text-zinc-600 text-base">No expenses this month</Text>
        <Text className="text-zinc-700 text-sm mt-1">Tap an emoji above to add one</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4">
      <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-2 px-1">
        Expenses ({monthExpenses.length})
      </Text>
      <View className="rounded-2xl overflow-hidden">
        <FlatList
          data={monthExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExpenseItem expense={item} />}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}
