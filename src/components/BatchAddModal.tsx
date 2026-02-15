import { useState } from "react";
import { View, Text, Pressable, Modal, TextInput, Platform, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DEFAULT_EMOJIS } from "../constants";

interface BatchEntry {
  id: string;
  emoji: string;
  amount: string;
  date: Date;
  showDatePicker: boolean;
}

interface BatchAddModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (entries: Array<{ emoji: string; amount: number; date: Date }>) => void;
}

export function BatchAddModal({ visible, onClose, onSubmit }: BatchAddModalProps) {
  const [entries, setEntries] = useState<BatchEntry[]>([
    {
      id: Date.now().toString(),
      emoji: DEFAULT_EMOJIS[0],
      amount: "",
      date: new Date(),
      showDatePicker: false,
    },
  ]);

  const addNewRow = () => {
    setEntries((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        emoji: DEFAULT_EMOJIS[0],
        amount: "",
        date: new Date(),
        showDatePicker: false,
      },
    ]);
  };

  const removeRow = (id: string) => {
    if (entries.length === 1) return;
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const cycleEmoji = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const currentIndex = DEFAULT_EMOJIS.indexOf(entry.emoji);
          const nextIndex = (currentIndex + 1) % DEFAULT_EMOJIS.length;
          return { ...entry, emoji: DEFAULT_EMOJIS[nextIndex] };
        }
        return entry;
      })
    );
  };

  const updateAmount = (id: string, amount: string) => {
    if (amount && !/^\d*\.?\d{0,2}$/.test(amount)) return;
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, amount } : entry))
    );
  };

  const toggleDatePicker = (id: string, show: boolean) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, showDatePicker: show } : entry))
    );
  };

  const updateDate = (id: string, selectedDate?: Date) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          return {
            ...entry,
            date: selectedDate || entry.date,
            showDatePicker: Platform.OS === "ios",
          };
        }
        return entry;
      })
    );
  };

  const handleSubmit = () => {
    const validEntries = entries
      .filter((entry) => entry.amount && parseFloat(entry.amount) > 0)
      .map((entry) => ({
        emoji: entry.emoji,
        amount: parseFloat(entry.amount),
        date: entry.date,
      }));

    if (validEntries.length === 0) return;

    onSubmit(validEntries);
    setEntries([
      {
        id: Date.now().toString(),
        emoji: DEFAULT_EMOJIS[0],
        amount: "",
        date: new Date(),
        showDatePicker: false,
      },
    ]);
    onClose();
  };

  const handleClose = () => {
    setEntries([
      {
        id: Date.now().toString(),
        emoji: DEFAULT_EMOJIS[0],
        amount: "",
        date: new Date(),
        showDatePicker: false,
      },
    ]);
    onClose();
  };

  const formatDate = (date: Date) => {
    const isToday = date.toDateString() === new Date().toDateString();
    return isToday
      ? "Today"
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable className="flex-1 bg-black/50" onPress={handleClose} />
      <View className="bg-zinc-900 rounded-t-3xl px-6 pt-6 pb-10 max-h-[80%]">
        <Text className="text-white text-2xl font-bold mb-4 text-center">
          Batch Add Expenses
        </Text>

        <ScrollView className="flex-1 mb-4">
          {entries.map((entry) => (
            <View key={entry.id} className="bg-zinc-800 rounded-xl p-4 mb-3">
              <View className="flex-row items-center gap-3">
                {/* Emoji selector */}
                <Pressable
                  onPress={() => cycleEmoji(entry.id)}
                  className="w-12 h-12 items-center justify-center rounded-full bg-zinc-700 active:bg-zinc-600"
                >
                  <Text className="text-2xl">{entry.emoji}</Text>
                </Pressable>

                {/* Amount input */}
                <TextInput
                  value={entry.amount}
                  onChangeText={(text) => updateAmount(entry.id, text)}
                  placeholder="0.00"
                  placeholderTextColor="#71717a"
                  keyboardType="decimal-pad"
                  className="flex-1 bg-zinc-700 rounded-lg px-4 py-3 text-white text-lg"
                />

                {/* Remove button */}
                {entries.length > 1 && (
                  <Pressable
                    onPress={() => removeRow(entry.id)}
                    className="w-8 h-8 items-center justify-center"
                  >
                    <Text className="text-zinc-400 text-xl">×</Text>
                  </Pressable>
                )}
              </View>

              {/* Date selector */}
              <Pressable
                onPress={() => toggleDatePicker(entry.id, true)}
                className="flex-row items-center mt-3 gap-1"
              >
                <Text className="text-[14px]">🕐</Text>
                <Text className="text-zinc-400 text-sm">{formatDate(entry.date)}</Text>
              </Pressable>

              {/* Date picker */}
              {entry.showDatePicker && (
                <DateTimePicker
                  value={entry.date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(_event, selectedDate) => updateDate(entry.id, selectedDate)}
                  maximumDate={new Date()}
                  themeVariant="dark"
                />
              )}
            </View>
          ))}
        </ScrollView>

        {/* Add another button */}
        <Pressable
          onPress={addNewRow}
          className="bg-zinc-800 rounded-xl py-3 mb-3 active:bg-zinc-700"
        >
          <Text className="text-zinc-400 text-center text-base font-medium">+ Add Another</Text>
        </Pressable>

        {/* Submit button */}
        <Pressable
          onPress={handleSubmit}
          className="bg-emerald-500 rounded-xl py-4 active:bg-emerald-600"
        >
          <Text className="text-white text-center text-lg font-bold">Add All</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
