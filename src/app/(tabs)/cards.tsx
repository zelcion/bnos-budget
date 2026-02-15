import { useRef, useState } from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useExpenseStore } from "../../stores/useExpenseStore";
import { AddCardModal } from "../../components/AddCardModal";

export default function CardsScreen() {
  const cards = useExpenseStore((s) => s.cards);
  const expenses = useExpenseStore((s) => s.expenses);
  const addCard = useExpenseStore((s) => s.addCard);
  const removeCard = useExpenseStore((s) => s.removeCard);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddCard = (name: string, color: string) => {
    addCard({ id: Date.now().toString(), name, color });
    setModalVisible(false);
  };

  const getExpenseCount = (cardId: string) =>
    expenses.filter((e) => e.cardId === cardId).length;

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="flex-1 px-4 pt-4">
        <Text className="text-white text-2xl font-bold mb-6">Your Cards</Text>

        {cards.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-zinc-500 text-center px-8">
              No cards yet — add one to track which card you use
            </Text>
          </View>
        ) : (
          <View className="flex-1">
            {cards.map((card) => (
              <CardRow
                key={card.id}
                name={card.name}
                color={card.color}
                expenseCount={getExpenseCount(card.id)}
                onDelete={() => removeCard(card.id)}
              />
            ))}
          </View>
        )}

        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-blue-600 rounded-xl py-4 mb-6 active:bg-blue-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Add Card
          </Text>
        </Pressable>
      </View>

      <AddCardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddCard}
      />
    </SafeAreaView>
  );
}

interface CardRowProps {
  name: string;
  color: string;
  expenseCount: number;
  onDelete: () => void;
}

function CardRow({ name, color, expenseCount, onDelete }: CardRowProps) {
  const swipeableRef = useRef<Swipeable>(null);

  const handleDelete = () => {
    swipeableRef.current?.close();
    onDelete();
  };

  const renderRightActions = () => (
    <Pressable
      onPress={handleDelete}
      className="bg-red-500 justify-center items-center px-6 rounded-r-xl"
    >
      <Text className="text-white font-bold">Delete</Text>
    </Pressable>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
    >
      <View className="flex-row items-center bg-zinc-900 rounded-xl p-4 mb-3">
        <View
          className="w-10 h-10 rounded-full mr-4"
          style={{ backgroundColor: color }}
        />
        <View className="flex-1">
          <Text className="text-white text-base font-semibold">{name}</Text>
          <Text className="text-zinc-500 text-sm">
            {expenseCount} {expenseCount === 1 ? "expense" : "expenses"}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}
