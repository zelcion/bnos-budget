import { useState } from "react";
import { View, Text, TextInput, Pressable, Modal } from "react-native";

const CARD_COLORS = [
  "#EF4444",
  "#F59E0B",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F97316",
];

interface AddCardModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}

export function AddCardModal({ visible, onClose, onAdd }: AddCardModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(CARD_COLORS[0]);

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), color);
    setName("");
    setColor(CARD_COLORS[0]);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50" onPress={onClose} />
      <View className="bg-zinc-900 rounded-t-3xl px-6 pt-6 pb-10">
        <Text className="text-white text-lg font-bold text-center mb-6">
          Add Card
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Card name"
          placeholderTextColor="#71717a"
          className="bg-zinc-800 text-white px-4 py-3 rounded-xl text-base mb-4"
        />

        <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
          Color
        </Text>
        <View className="flex-row gap-3 mb-6">
          {CARD_COLORS.map((c) => (
            <Pressable
              key={c}
              onPress={() => setColor(c)}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                color === c ? "border-2 border-white" : ""
              }`}
              style={{ backgroundColor: c }}
            >
              {color === c && <Text className="text-white text-sm">✓</Text>}
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={handleAdd}
          className="bg-blue-600 rounded-xl py-4 active:bg-blue-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Add Card
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
