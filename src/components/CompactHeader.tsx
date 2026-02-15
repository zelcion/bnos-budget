import { View, Text, Pressable } from "react-native";
import { useExpenseStore } from "../stores/useExpenseStore";
import { getAmountColor } from "../utils/calculations";
import { DEFAULT_EMOJIS } from "../constants";

interface CompactHeaderProps {
  onEmojiPress: (emoji: string) => void;
  onAddPress: () => void;
}

export function CompactHeader({ onEmojiPress, onAddPress }: CompactHeaderProps) {
  const available = useExpenseStore((s) => s.getAvailableAmount());
  const totalIncome = useExpenseStore((s) =>
    s.incomes.reduce((sum, i) => sum + i.amount, 0)
  );
  const color = getAmountColor(available, totalIncome);
  const displayAmount = Math.abs(Math.round(available));
  const isNegative = available < 0;

  return (
    <View className="flex-row items-center justify-between px-4">
      <Text className="text-[28px] font-extrabold" style={{ color }}>
        {isNegative ? "-" : ""}${displayAmount}
      </Text>
      <View className="flex-row gap-[6]">
        {DEFAULT_EMOJIS.slice(0, 4).map((emoji) => (
          <Pressable
            key={emoji}
            onPress={() => onEmojiPress(emoji)}
            className="w-[36] h-[36] items-center justify-center rounded-[18] bg-[#27272a]"
          >
            <Text className="text-[18px]">{emoji}</Text>
          </Pressable>
        ))}
        <Pressable
          onPress={onAddPress}
          className="w-[36] h-[36] items-center justify-center rounded-[18] bg-[#27272a]"
        >
          <Text className="text-[14px] text-[#71717a]">+</Text>
        </Pressable>
      </View>
    </View>
  );
}
