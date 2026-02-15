import { useCallback, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import type { Expense } from "../types";
import { useExpenseStore } from "../stores/useExpenseStore";

const DELETE_BTN_WIDTH = 80;
const TIMING_CONFIG = { duration: 200 };

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const removeExpense = useExpenseStore((s) => s.removeExpense);
  const updateExpense = useExpenseStore((s) => s.updateExpense);
  const cards = useExpenseStore((s) => s.cards);
  const [editing, setEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(expense.amount.toString());

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const isOpen = useSharedValue(false);

  const card = expense.cardId ? cards.find((c) => c.id === expense.cardId) : undefined;

  const handleDelete = useCallback(() => {
    removeExpense(expense.id);
  }, [expense.id, removeExpense]);

  const handleLongPress = () => {
    setEditAmount(expense.amount.toString());
    setEditing(true);
  };

  const handleSaveEdit = () => {
    const amount = parseFloat(editAmount);
    if (amount && amount > 0) {
      updateExpense(expense.id, { amount });
    }
    setEditing(false);
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-15, 15])
    .failOffsetY([-10, 10])
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((e) => {
      const next = startX.value + e.translationX;
      // Only allow swiping left (negative), clamp at delete button width
      translateX.value = Math.max(-DELETE_BTN_WIDTH, Math.min(0, next));
    })
    .onEnd(() => {
      // If dragged past half the button width, snap open; otherwise snap closed
      if (translateX.value < -DELETE_BTN_WIDTH / 2) {
        translateX.value = withTiming(-DELETE_BTN_WIDTH, TIMING_CONFIG);
        isOpen.value = true;
      } else {
        translateX.value = withTiming(0, TIMING_CONFIG);
        isOpen.value = false;
      }
    });

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    width: -translateX.value > 0 ? -translateX.value : 0,
  }));

  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <View className="relative overflow-hidden">
      {/* Delete button behind the row */}
      <Animated.View className="absolute right-0 top-0 bottom-0 justify-center overflow-hidden" style={deleteStyle}>
        <Pressable onPress={handleDelete} className="bg-red-500 justify-center items-center h-full w-[80]">
          <Text className="text-white font-bold">Delete</Text>
        </Pressable>
      </Animated.View>

      {/* Swipeable row */}
      <GestureDetector gesture={pan}>
        <Animated.View style={rowStyle}>
          <Pressable
            onLongPress={handleLongPress}
            className="flex-row items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800"
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-2xl">{expense.emoji}</Text>
              {card && (
                <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: card.color }} />
              )}
              <Text className="text-sm text-zinc-500">{formattedDate}</Text>
            </View>
            {editing ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-white">$</Text>
                <TextInput
                  value={editAmount}
                  onChangeText={setEditAmount}
                  keyboardType="numeric"
                  autoFocus
                  onBlur={handleSaveEdit}
                  onSubmitEditing={handleSaveEdit}
                  className="text-white text-base font-semibold bg-zinc-800 px-2 py-1 rounded min-w-[60px]"
                />
              </View>
            ) : (
              <Text className="text-white text-base font-semibold">
                -${expense.amount.toFixed(0)}
              </Text>
            )}
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}


