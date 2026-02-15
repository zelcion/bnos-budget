import { useState } from "react";
import { View, Text, Pressable, Modal, TextInput } from "react-native";

const INCOME_EMOJIS = ["💰", "💵", "💳", "🏦", "💻", "🎓", "📈", "🏢"];

interface AddIncomeModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (emoji: string, amount: number, isRecurring: boolean) => void;
}

export function AddIncomeModal({
  visible,
  onClose,
  onSubmit,
}: AddIncomeModalProps) {
  const [selectedEmoji, setSelectedEmoji] = useState("💰");
  const [amount, setAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = () => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return;
    onSubmit(selectedEmoji, parsed, isRecurring);
    setSelectedEmoji("💰");
    setAmount("");
    setIsRecurring(false);
  };

  const handleClose = () => {
    setSelectedEmoji("💰");
    setAmount("");
    setIsRecurring(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable className="flex-1 bg-black/50" onPress={handleClose} />
      <View className="bg-zinc-900 rounded-t-3xl px-6 pt-6 pb-10">
        <Text className="text-white text-lg font-bold text-center mb-5">
          Add Income
        </Text>

        {/* Emoji grid */}
        <View className="flex-row flex-wrap justify-center gap-2 mb-5">
          {INCOME_EMOJIS.map((emoji) => (
            <Pressable
              key={emoji}
              onPress={() => setSelectedEmoji(emoji)}
              className={`w-12 h-12 items-center justify-center rounded-xl ${
                selectedEmoji === emoji ? "bg-green-600" : "bg-zinc-800"
              }`}
            >
              <Text className="text-2xl">{emoji}</Text>
            </Pressable>
          ))}
        </View>

        {/* Amount input */}
        <View className="bg-zinc-800 rounded-xl px-4 py-3 mb-4 flex-row items-center">
          <Text className="text-zinc-400 text-lg mr-2">$</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#71717a"
            className="text-white text-lg flex-1"
          />
        </View>

        {/* Recurring toggle */}
        <Pressable
          onPress={() => setIsRecurring((prev) => !prev)}
          className={`rounded-xl px-4 py-3 mb-6 flex-row items-center justify-between ${
            isRecurring ? "bg-green-600/20" : "bg-zinc-800"
          }`}
        >
          <Text className="text-white text-base">Recurring monthly</Text>
          <View
            className={`w-6 h-6 rounded-md items-center justify-center ${
              isRecurring ? "bg-green-500" : "bg-zinc-700"
            }`}
          >
            {isRecurring && (
              <Text className="text-white text-xs font-bold">✓</Text>
            )}
          </View>
        </Pressable>

        {/* Submit */}
        <Pressable
          onPress={handleSubmit}
          className="bg-green-600 rounded-xl py-4 active:bg-green-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Add Income
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
