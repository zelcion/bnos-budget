import { useRef, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import type { Expense } from "../types";
import { useExpenseStore } from "../stores/useExpenseStore";

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const removeExpense = useExpenseStore((s) => s.removeExpense);
  const updateExpense = useExpenseStore((s) => s.updateExpense);
  const swipeableRef = useRef<Swipeable>(null);
  const [editing, setEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(expense.amount.toString());

  const handleDelete = () => {
    swipeableRef.current?.close();
    removeExpense(expense.id);
  };

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

  const renderRightActions = () => (
    <Pressable
      onPress={handleDelete}
      className="bg-red-500 justify-center items-center px-6"
    >
      <Text className="text-white font-bold">Delete</Text>
    </Pressable>
  );

  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions} overshootRight={false}>
      <Pressable
        onLongPress={handleLongPress}
        className="flex-row items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800"
      >
        <View className="flex-row items-center gap-3">
          <Text className="text-2xl">{expense.emoji}</Text>
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
              style={{ color: "white" }}
            />
          </View>
        ) : (
          <Text className="text-white text-base font-semibold">
            -${expense.amount.toFixed(0)}
          </Text>
        )}
      </Pressable>
    </Swipeable>
  );
}
