import { View, Text, Pressable } from "react-native";
import { DEFAULT_EMOJIS } from "../constants";

interface QuickAddBarProps {
  onEmojiPress?: (emoji: string) => void;
  onAddPress?: () => void;
}

export function QuickAddBar({ onEmojiPress, onAddPress }: QuickAddBarProps) {
  // 2 rows x 3 columns grid: 5 emojis + "+" button
  const row1 = DEFAULT_EMOJIS.slice(0, 3);
  const row2 = DEFAULT_EMOJIS.slice(3, 5);

  return (
    <View className="bg-zinc-900 rounded-2xl mx-4 py-3 px-4 gap-2">
      {/* Row 1: first 3 emojis */}
      <View className="flex-row justify-around">
        {row1.map((emoji) => (
          <Pressable
            key={emoji}
            onPress={() => onEmojiPress?.(emoji)}
            className="w-14 h-14 items-center justify-center rounded-full bg-zinc-800 active:bg-zinc-700"
          >
            <Text className="text-2xl">{emoji}</Text>
          </Pressable>
        ))}
      </View>
      {/* Row 2: remaining emojis + "+" */}
      <View className="flex-row justify-around">
        {row2.map((emoji) => (
          <Pressable
            key={emoji}
            onPress={() => onEmojiPress?.(emoji)}
            className="w-14 h-14 items-center justify-center rounded-full bg-zinc-800 active:bg-zinc-700"
          >
            <Text className="text-2xl">{emoji}</Text>
          </Pressable>
        ))}
        <Pressable
          onPress={onAddPress}
          className="w-14 h-14 items-center justify-center rounded-full bg-zinc-800 active:bg-zinc-700"
        >
          <Text className="text-xl text-zinc-400">+</Text>
        </Pressable>
      </View>
    </View>
  );
}
