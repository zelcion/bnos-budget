import { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { BigNumber } from "../../components/BigNumber";
import { MonthSwitcher } from "../../components/MonthSwitcher";
import { IncomePills } from "../../components/IncomePills";
import { QuickAddBar } from "../../components/QuickAddBar";
import { ExpenseList } from "../../components/ExpenseList";
import { AmountDrawer } from "../../components/AmountDrawer";
import { useExpenseStore } from "../../stores/useExpenseStore";

export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🍔");
  const addExpense = useExpenseStore((s) => s.addExpense);

  const handleEmojiPress = (emoji: string) => {
    setSelectedEmoji(emoji);
    setDrawerVisible(true);
  };

  const handleAddExpense = (amount: number) => {
    addExpense({
      id: Date.now().toString(),
      emoji: selectedEmoji,
      amount,
      date: new Date().toISOString(),
    });
    setDrawerVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="flex-1">
        <MonthSwitcher />
        <BigNumber />
        <IncomePills />
        <View className="my-3">
          <QuickAddBar
            onEmojiPress={handleEmojiPress}
            onAddPress={() => handleEmojiPress("📝")}
          />
        </View>
        <ExpenseList />
      </View>
      <AmountDrawer
        visible={drawerVisible}
        emoji={selectedEmoji}
        onClose={() => setDrawerVisible(false)}
        onSubmit={handleAddExpense}
      />
    </SafeAreaView>
  );
}
