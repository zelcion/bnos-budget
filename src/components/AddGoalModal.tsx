import { useState } from "react";
import { View, Text, Pressable, Modal, TextInput } from "react-native";

const PRESET_COLORS = [
  "#EF4444",
  "#F59E0B",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F97316",
];

interface AddGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, amount: number, color: string) => void;
}

export function AddGoalModal({
  visible,
  onClose,
  onSubmit,
}: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  const handleSubmit = () => {
    const parsed = parseFloat(amount);
    if (!name.trim() || !parsed || parsed <= 0) return;
    onSubmit(name.trim(), parsed, selectedColor);
    setName("");
    setAmount("");
    setSelectedColor(PRESET_COLORS[0]);
  };

  const handleClose = () => {
    setName("");
    setAmount("");
    setSelectedColor(PRESET_COLORS[0]);
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
          Add Savings Goal
        </Text>

        {/* Name input */}
        <View className="bg-zinc-800 rounded-xl px-4 py-3 mb-4">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Goal name"
            placeholderTextColor="#71717a"
            className="text-white text-lg"
          />
        </View>

        {/* Amount input */}
        <View className="bg-zinc-800 rounded-xl px-4 py-3 mb-5 flex-row items-center">
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

        {/* Color picker */}
        <Text className="text-zinc-400 text-sm mb-2">Color</Text>
        <View className="flex-row flex-wrap justify-center gap-3 mb-6">
          {PRESET_COLORS.map((color) => (
            <Pressable
              key={color}
              onPress={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                selectedColor === color ? "border-2 border-white" : ""
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </View>

        {/* Submit */}
        <Pressable
          onPress={handleSubmit}
          className="bg-blue-600 rounded-xl py-4 active:bg-blue-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Add Goal
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
