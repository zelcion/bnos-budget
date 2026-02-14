import { View, Text, Pressable, FlatList } from "react-native";
import { useExpenseStore } from "../../stores/useExpenseStore";

export default function CardsScreen() {
  const cards = useExpenseStore((s) => s.cards);

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      {cards.length === 0 ? (
        <Text className="text-gray-400 text-center py-12">No cards yet</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              className="rounded-xl p-4 mb-3"
              style={{ backgroundColor: item.color + "20" }}
            >
              <Text className="text-base font-semibold">{item.name}</Text>
            </View>
          )}
        />
      )}
      <Pressable className="bg-blue-600 rounded-xl py-3 mx-4 mt-4">
        <Text className="text-white text-center font-semibold">Add Card</Text>
      </Pressable>
    </View>
  );
}
