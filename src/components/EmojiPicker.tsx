import { View, Text, Pressable, Modal, ScrollView } from "react-native";

const EMOJI_CATEGORIES: Record<string, string[]> = {
  "Food & Drink": ["🍔", "🍕", "🍣", "🍺", "☕", "🍰", "🥗", "🌮"],
  "Transport": ["🚗", "⛽", "🚌", "🚕", "✈️", "🚇", "🅿️", "🛵"],
  "Shopping": ["🛒", "👕", "👟", "💄", "🎁", "📱", "💻", "🛍️"],
  "Home": ["🏠", "🔑", "💡", "🧹", "🛋️", "🔧", "📦", "🌿"],
  "Health": ["💊", "🏥", "🦷", "👓", "🏋️", "💇", "🧘", "🩺"],
  "Fun": ["🎮", "🎬", "🎵", "📚", "🎨", "🎳", "🎤", "🎲"],
  "Bills": ["📄", "📞", "💳", "🏦", "📶", "💰", "🧾", "📮"],
};

interface EmojiPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ visible, onClose, onSelect }: EmojiPickerProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50" onPress={onClose} />
      <View className="bg-zinc-900 rounded-t-3xl px-4 pt-5 pb-10 max-h-[70%]">
        <Text className="text-white text-lg font-bold text-center mb-4">Pick an emoji</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
            <View key={category} className="mb-4">
              <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-2">{category}</Text>
              <View className="flex-row flex-wrap gap-2">
                {emojis.map((emoji) => (
                  <Pressable
                    key={emoji}
                    onPress={() => {
                      onSelect(emoji);
                      onClose();
                    }}
                    className="w-12 h-12 items-center justify-center rounded-xl bg-zinc-800 active:bg-zinc-700"
                  >
                    <Text className="text-2xl">{emoji}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}
