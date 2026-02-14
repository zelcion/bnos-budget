import { View, Text } from "react-native";
import { useExpenseStore } from "../stores/useExpenseStore";
import { getAmountColor } from "../utils/calculations";

export function BigNumber() {
  const available = useExpenseStore((s) => s.getAvailableAmount());
  const totalIncome = useExpenseStore((s) => s.incomes.reduce((sum, i) => sum + i.amount, 0));
  const color = getAmountColor(available, totalIncome);
  const isNegative = available < 0;
  const displayAmount = Math.abs(Math.round(available));

  return (
    <View className="items-center py-4">
      <Text className="text-sm text-zinc-500 uppercase tracking-widest mb-1">
        Available to Spend
      </Text>
      <Text
        style={{ color, fontSize: 72, fontWeight: "800", lineHeight: 80 }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {isNegative ? "-" : ""}${displayAmount}
      </Text>
    </View>
  );
}
