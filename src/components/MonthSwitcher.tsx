import { View, Text, Pressable } from "react-native";
import { useExpenseStore } from "../stores/useExpenseStore";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function MonthSwitcher() {
  const { currentMonth, setCurrentMonth } = useExpenseStore();
  const now = new Date();
  const isCurrentMonth =
    currentMonth.year === now.getFullYear() &&
    currentMonth.month === now.getMonth() + 1;

  const goBack = () => {
    const m = currentMonth.month === 1 ? 12 : currentMonth.month - 1;
    const y = currentMonth.month === 1 ? currentMonth.year - 1 : currentMonth.year;
    setCurrentMonth({ year: y, month: m });
  };

  const goForward = () => {
    const m = currentMonth.month === 12 ? 1 : currentMonth.month + 1;
    const y = currentMonth.month === 12 ? currentMonth.year + 1 : currentMonth.year;
    setCurrentMonth({ year: y, month: m });
  };

  const goToCurrent = () => {
    setCurrentMonth({ year: now.getFullYear(), month: now.getMonth() + 1 });
  };

  return (
    <View className="items-center pt-4 pb-1">
      <View className="flex-row items-center gap-6">
        <Pressable onPress={goBack} className="px-3 py-1">
          <Text className="text-2xl text-zinc-400">&#8249;</Text>
        </Pressable>
        <Text className="text-base font-semibold text-white">
          {MONTH_NAMES[currentMonth.month - 1]} {currentMonth.year}
        </Text>
        <Pressable onPress={goForward} className="px-3 py-1">
          <Text className="text-2xl text-zinc-400">&#8250;</Text>
        </Pressable>
      </View>
      {!isCurrentMonth && (
        <Pressable onPress={goToCurrent} className="mt-2 bg-zinc-800 rounded-full px-4 py-1">
          <Text className="text-zinc-400 text-xs">Back to Current Month</Text>
        </Pressable>
      )}
    </View>
  );
}
