import { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";

interface AmountDrawerProps {
  visible: boolean;
  emoji: string;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export function AmountDrawer({ visible, emoji, onClose, onSubmit }: AmountDrawerProps) {
  const [value, setValue] = useState("");

  const handleDigit = (digit: string) => {
    if (digit === "." && value.includes(".")) return;
    if (value.includes(".") && value.split(".")[1].length >= 2) return;
    if (!value.includes(".") && digit !== "." && value.length >= 7) return;
    setValue(prev => prev + digit);
  };

  const handleBackspace = () => {
    setValue(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const amount = parseFloat(value);
    if (!amount || amount <= 0) return;
    onSubmit(amount);
    setValue("");
  };

  const handleClose = () => {
    setValue("");
    onClose();
  };

  const displayAmount = value || "0";

  const numpadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "⌫"],
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable className="flex-1 bg-black/50" onPress={handleClose} />
      <View className="bg-zinc-900 rounded-t-3xl px-6 pt-6 pb-10">
        {/* Emoji + Amount */}
        <View className="items-center mb-6">
          <Text className="text-4xl mb-2">{emoji}</Text>
          <Text className="text-white text-5xl font-bold">${displayAmount}</Text>
        </View>

        {/* Numpad */}
        {numpadRows.map((row, i) => (
          <View key={i} className="flex-row justify-around mb-3">
            {row.map((key) => (
              <Pressable
                key={key}
                onPress={() => key === "⌫" ? handleBackspace() : handleDigit(key)}
                className="w-20 h-14 items-center justify-center rounded-xl bg-zinc-800 active:bg-zinc-700"
              >
                <Text className="text-white text-2xl font-medium">{key}</Text>
              </Pressable>
            ))}
          </View>
        ))}

        {/* Add button */}
        <Pressable
          onPress={handleSubmit}
          className="bg-emerald-500 rounded-xl py-4 mt-2 active:bg-emerald-600"
        >
          <Text className="text-white text-center text-lg font-bold">Add Expense</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
