import { useState, useRef } from "react";
import { View, Text, SafeAreaView, Animated, useWindowDimensions, Pressable } from "react-native";
import { AnimatedView, AnimatedScrollView } from "../../components/Animated";
import { BigNumber } from "../../components/BigNumber";
import { MonthSwitcher } from "../../components/MonthSwitcher";
import { QuickAddBar } from "../../components/QuickAddBar";
import { ExpenseList } from "../../components/ExpenseList";
import { AmountDrawer } from "../../components/AmountDrawer";
import { CompactHeader } from "../../components/CompactHeader";
import { EmojiPicker } from "../../components/EmojiPicker";
import { useExpenseStore } from "../../stores/useExpenseStore";

export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🍔");
  const addExpense = useExpenseStore((s) => s.addExpense);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { height: screenHeight } = useWindowDimensions();

  const handleEmojiPress = (emoji: string) => {
    setSelectedEmoji(emoji);
    setDrawerVisible(true);
  };

  const handleAddPress = () => {
    setEmojiPickerVisible(true);
  };

  const handleEmojiPickerSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    setDrawerVisible(true);
  };

  const handleAddExpense = (amount: number, date: Date, cardId?: string) => {
    addExpense({
      id: Date.now().toString(),
      emoji: selectedEmoji,
      amount,
      date: date.toISOString(),
      cardId,
    });
    setDrawerVisible(false);
  };

  // Compact header fades in after scrolling past 100px
  const compactOpacity = scrollY.interpolate({
    inputRange: [100, 160],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Full header fades out as user scrolls
  const fullHeaderOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      {/* Month picker - always pinned at top */}
      <MonthSwitcher />

      {/* Compact sticky header - sits right below month picker, appears on scroll */}
      <AnimatedView
        className="bg-[#09090b] pb-2 relative"
        style={{ opacity: compactOpacity }}
        pointerEvents="box-none"
      >
        <CompactHeader
          onEmojiPress={handleEmojiPress}
          onAddPress={handleAddPress}
        />
      </AnimatedView>

      <AnimatedScrollView
        className="flex-1 relative"
        contentContainerClassName="h-full"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View className="h-full"> {/* First scrollable Section */}
          {/* Full-size header section with marginTop to center big number */}
          <AnimatedView style={{ opacity: fullHeaderOpacity, marginTop: screenHeight * 0.15 }}>
            <BigNumber />
          </AnimatedView>

          <View className="my-3">
            <QuickAddBar
              onEmojiPress={handleEmojiPress}
              onAddPress={handleAddPress}
            />
          </View>
        </View>

        {/* Second scrollable Section */}
        <View className="pb-8">
          <ExpenseList />
        </View>
      </AnimatedScrollView>

      {/* Scroll hint - pinned to bottom of screen, fades on scroll */}
      <AnimatedView
        className="absolute bottom-5 left-4 right-0 items-center gap-1 flex-row"
        style={{ opacity: fullHeaderOpacity }}
        pointerEvents="none"
      >
        <Text className="text-zinc-500 text-base">↓</Text>
        <Text className="text-zinc-500 text-xs ml-2 mt-1">Scroll down to see expenses</Text>
      </AnimatedView>

      <EmojiPicker
        visible={emojiPickerVisible}
        onClose={() => setEmojiPickerVisible(false)}
        onSelect={handleEmojiPickerSelect}
      />

      <AmountDrawer
        visible={drawerVisible}
        emoji={selectedEmoji}
        onClose={() => setDrawerVisible(false)}
        onSubmit={handleAddExpense}
      />
    </SafeAreaView>
  );
}
