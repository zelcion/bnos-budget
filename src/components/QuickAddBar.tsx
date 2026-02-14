import { View, Text, Pressable } from "react-native";
import { DEFAULT_EMOJIS } from "../constants";

interface QuickAddBarProps {
  onEmojiPress?: (emoji: string) => void;
  onAddPress?: () => void;
}

export function QuickAddBar({ onEmojiPress, onAddPress }: QuickAddBarProps) {
  return (
    <View className="flex-row items-center justify-around px-4 py-3 bg-zinc-900 rounded-2xl mx-4">
      {DEFAULT_EMOJIS.map((emoji) => (
        <Pressable
          key={emoji}
          onPress={() => onEmojiPress?.(emoji)}
          className="w-12 h-12 items-center justify-center rounded-full bg-zinc-800 active:bg-zinc-700"
        >
          <Text className="text-2xl">{emoji}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={onAddPress}
        className="w-12 h-12 items-center justify-center rounded-full bg-zinc-800 active:bg-zinc-700"
      >
        <Text className="text-xl text-zinc-400">+</Text>
      </Pressable>
    </View>
  );
}
