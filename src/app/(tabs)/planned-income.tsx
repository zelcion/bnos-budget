import { useRef, useState } from "react";
import { View, Text, Pressable, SafeAreaView, ScrollView } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useExpenseStore } from "../../stores/useExpenseStore";
import { AddIncomeModal } from "../../components/AddIncomeModal";
import { AddGoalModal } from "../../components/AddGoalModal";

export default function PlannedIncomeScreen() {
  const incomes = useExpenseStore((s) => s.incomes);
  const goals = useExpenseStore((s) => s.goals);
  const addIncome = useExpenseStore((s) => s.addIncome);
  const removeIncome = useExpenseStore((s) => s.removeIncome);
  const addGoal = useExpenseStore((s) => s.addGoal);
  const removeGoal = useExpenseStore((s) => s.removeGoal);

  const [incomeModalVisible, setIncomeModalVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const handleAddIncome = (emoji: string, amount: number, isRecurring: boolean) => {
    addIncome({
      id: Date.now().toString(),
      emoji,
      amount,
      date: new Date().toISOString(),
      isRecurring,
    });
    setIncomeModalVisible(false);
  };

  const handleAddGoal = (name: string, amount: number, color: string) => {
    addGoal({
      id: Date.now().toString(),
      name,
      amount,
      color,
    });
    setGoalModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-white text-xl font-bold mb-4">Income Sources</Text>

        {incomes.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-zinc-500 text-center px-8">
              No income sources yet
            </Text>
          </View>
        ) : (
          <View className="mb-4">
            {incomes.map((income) => (
              <IncomeRow
                key={income.id}
                emoji={income.emoji}
                amount={income.amount}
                isRecurring={income.isRecurring}
                onDelete={() => removeIncome(income.id)}
              />
            ))}
          </View>
        )}

        <Pressable
          onPress={() => setIncomeModalVisible(true)}
          className="bg-green-600 rounded-xl py-4 mb-6 active:bg-green-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Add Income
          </Text>
        </Pressable>

        <Text className="text-white text-xl font-bold mb-4 mt-8">Savings Goals</Text>

        {goals.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-zinc-500 text-center px-8">
              No savings goals yet
            </Text>
          </View>
        ) : (
          <View className="mb-4">
            {goals.map((goal) => (
              <GoalRow
                key={goal.id}
                name={goal.name}
                amount={goal.amount}
                color={goal.color}
                onDelete={() => removeGoal(goal.id)}
              />
            ))}
          </View>
        )}

        <Pressable
          onPress={() => setGoalModalVisible(true)}
          className="bg-blue-600 rounded-xl py-4 mb-6 active:bg-blue-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Add Goal
          </Text>
        </Pressable>
      </ScrollView>

      <AddIncomeModal
        visible={incomeModalVisible}
        onClose={() => setIncomeModalVisible(false)}
        onSubmit={handleAddIncome}
      />

      <AddGoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        onSubmit={handleAddGoal}
      />
    </SafeAreaView>
  );
}

interface IncomeRowProps {
  emoji: string;
  amount: number;
  isRecurring?: boolean;
  onDelete: () => void;
}

function IncomeRow({ emoji, amount, isRecurring, onDelete }: IncomeRowProps) {
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
            ${amount.toLocaleString()}
          </Text>
          {isRecurring && (
            <View className="bg-green-600 self-start px-2 py-1 rounded mt-1">
              <Text className="text-white text-xs font-semibold">Recurring</Text>
            </View>
          )}
        </View>
      </View>
    </Swipeable>
  );
}

interface GoalRowProps {
  name: string;
  amount: number;
  color: string;
  onDelete: () => void;
}

function GoalRow({ name, amount, color, onDelete }: GoalRowProps) {
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
            ${amount}/mo
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}
