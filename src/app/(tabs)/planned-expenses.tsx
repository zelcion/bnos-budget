import { useRef, useState } from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useExpenseStore } from "../../stores/useExpenseStore";
import { AddPlannedExpenseModal } from "../../components/AddPlannedExpenseModal";

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function PlannedExpensesScreen() {
  const expenses = useExpenseStore((s) => s.expenses);
  const addExpense = useExpenseStore((s) => s.addExpense);
  const removeExpense = useExpenseStore((s) => s.removeExpense);
  const [modalVisible, setModalVisible] = useState(false);

  const plannedExpenses = expenses.filter((e) => e.isPlanned === true);

  const handleAddPlannedExpense = (emoji: string, amount: number, dueDay: number) => {
    addExpense({
      id: Date.now().toString(),
      emoji,
      amount,
      date: new Date().toISOString(),
      isPlanned: true,
    });
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="flex-1 px-4 pt-4">
        <Text className="text-white text-2xl font-bold mb-6">Planned Expenses</Text>

        {plannedExpenses.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-zinc-500 text-center px-8">
              No planned expenses yet — add recurring bills to track them
            </Text>
          </View>
        ) : (
          <View className="flex-1">
            {plannedExpenses.map((expense) => (
              <PlannedExpenseRow
                key={expense.id}
                emoji={expense.emoji}
                amount={expense.amount}
                dueDay={15}
                onDelete={() => removeExpense(expense.id)}
              />
            ))}
          </View>
        )}

        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-purple-600 rounded-xl py-4 mb-6 active:bg-purple-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Add Planned Expense
          </Text>
        </Pressable>
      </View>

      <AddPlannedExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddPlannedExpense}
      />
    </SafeAreaView>
  );
}

interface PlannedExpenseRowProps {
  emoji: string;
  amount: number;
  dueDay: number;
  onDelete: () => void;
}

function PlannedExpenseRow({ emoji, amount, dueDay, onDelete }: PlannedExpenseRowProps) {
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
        <Text className="text-4xl mr-4">{emoji}</Text>
        <View className="flex-1">
          <Text className="text-white text-base font-semibold">
            ${amount.toFixed(2)}
          </Text>
          <Text className="text-zinc-500 text-sm">
            Due: {ordinal(dueDay)}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}
