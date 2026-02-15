import { useState } from "react";
import { View, Text, Pressable, Modal, TextInput, ScrollView } from "react-native";

const BILL_EMOJIS = ["🏠", "📱", "💡", "📶", "🚗", "💳", "🏥", "📄"];
const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

interface AddPlannedExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (emoji: string, amount: number, dueDay: number) => void;
}

export function AddPlannedExpenseModal({
  visible,
  onClose,
  onSubmit,
}: AddPlannedExpenseModalProps) {
  const [selectedEmoji, setSelectedEmoji] = useState("🏠");
  const [amount, setAmount] = useState("");
  const [dueDay, setDueDay] = useState(1);

  const handleSubmit = () => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return;
    onSubmit(selectedEmoji, parsed, dueDay);
    setSelectedEmoji("🏠");
    setAmount("");
    setDueDay(1);
  };

  const handleClose = () => {
    setSelectedEmoji("🏠");
    setAmount("");
    setDueDay(1);
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
          Add Planned Expense
        </Text>

        {/* Emoji grid */}
        <View className="flex-row flex-wrap justify-center gap-2 mb-5">
          {BILL_EMOJIS.map((emoji) => (
            <Pressable
              key={emoji}
              onPress={() => setSelectedEmoji(emoji)}
              className={`w-12 h-12 items-center justify-center rounded-xl ${
                selectedEmoji === emoji ? "bg-purple-600" : "bg-zinc-800"
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

        {/* Due day picker */}
        <Text className="text-zinc-400 text-sm mb-2">Due day of month</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          <View className="flex-row gap-2">
            {DAYS.map((day) => (
              <Pressable
                key={day}
                onPress={() => setDueDay(day)}
                className={`w-10 h-10 items-center justify-center rounded-lg ${
                  dueDay === day ? "bg-purple-600" : "bg-zinc-800"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    dueDay === day ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {day}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Submit */}
        <Pressable
          onPress={handleSubmit}
          className="bg-purple-600 rounded-xl py-4 active:bg-purple-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Add Planned Expense
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
