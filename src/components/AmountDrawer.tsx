import { useState } from "react";
import { View, Text, Pressable, Modal, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useExpenseStore } from "../stores/useExpenseStore";

interface AmountDrawerProps {
  visible: boolean;
  emoji: string;
  onClose: () => void;
  onSubmit: (amount: number, date: Date, cardId?: string) => void;
}

export function AmountDrawer({ visible, emoji, onClose, onSubmit }: AmountDrawerProps) {
  const cards = useExpenseStore((s) => s.cards);
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(undefined);

  const handleDigit = (digit: string) => {
    if (digit === "." && value.includes(".")) return;
    if (value.includes(".") && value.split(".")[1].length >= 2) return;
    if (!value.includes(".") && digit !== "." && value.length >= 7) return;
    setValue((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const amount = parseFloat(value);
    if (!amount || amount <= 0) return;
    onSubmit(amount, date, selectedCardId);
    setValue("");
    setDate(new Date());
    setSelectedCardId(undefined);
  };

  const handleClose = () => {
    setValue("");
    setDate(new Date());
    setShowDatePicker(false);
    setSelectedCardId(undefined);
    onClose();
  };

  const handleDateChange = (_event: unknown, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const displayAmount = value || "0";
  const isToday =
    date.toDateString() === new Date().toDateString();
  const dateLabel = isToday
    ? "Today"
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

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
        {/* Emoji + Amount + Date */}
        <View className="items-center mb-6">
          <Text className="text-4xl mb-2">{emoji}</Text>
          <Text className="text-white text-5xl font-bold">${displayAmount}</Text>
          {/* Date picker toggle */}
          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="flex-row items-center mt-2 gap-1"
          >
            <Text className="text-[16px]">🕐</Text>
            <Text className="text-zinc-400 text-sm">{dateLabel}</Text>
          </Pressable>
        </View>

        {/* Date picker */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            maximumDate={new Date()}
            themeVariant="dark"
          />
        )}

        {/* Card selection pills */}
        {cards.length > 0 && (
          <View className="flex-row flex-wrap justify-center gap-2 mb-4">
            <Pressable
              onPress={() => setSelectedCardId(undefined)}
              className={`px-3 py-1.5 rounded-full ${!selectedCardId ? 'bg-zinc-600' : 'bg-zinc-800'}`}
            >
              <Text className={`text-sm ${!selectedCardId ? 'text-white' : 'text-zinc-400'}`}>No card</Text>
            </Pressable>
            {cards.map((card) => (
              <Pressable
                key={card.id}
                onPress={() => setSelectedCardId(card.id)}
                className={`px-3 py-1.5 rounded-full flex-row items-center gap-1.5 ${selectedCardId === card.id ? 'bg-zinc-600' : 'bg-zinc-800'}`}
              >
                <View className="w-3 h-3 rounded-full" style={{ backgroundColor: card.color }} />
                <Text className={`text-sm ${selectedCardId === card.id ? 'text-white' : 'text-zinc-400'}`}>{card.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Numpad */}
        {numpadRows.map((row, i) => (
          <View key={i} className="flex-row justify-around mb-3">
            {row.map((key) => (
              <Pressable
                key={key}
                onPress={() => (key === "⌫" ? handleBackspace() : handleDigit(key))}
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
