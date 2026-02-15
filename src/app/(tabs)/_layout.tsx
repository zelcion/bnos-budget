import { useRef, useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { Slot } from "expo-router";
import { BudgetProgressBar } from "../../components/BudgetProgressBar";
import { WebPager, type WebPagerRef } from "../../components/WebPager";
import CardsScreen from "./cards";
import PlannedExpensesScreen from "./planned-expenses";
import HomeScreen from "./index";
import PlannedIncomeScreen from "./planned-income";

const TABS = [
  { key: "cards", title: "Cards", icon: "💳", iconSize: "text-xl" },
  { key: "planned-expenses", title: "Planned", icon: "📅", iconSize: "text-xl" },
  { key: "index", title: "Budget", icon: "💰", iconSize: "text-2xl" },
  { key: "planned-income", title: "Income", icon: "💵", iconSize: "text-xl" },
] as const;

const TAB_SCREENS = [CardsScreen, PlannedExpensesScreen, HomeScreen, PlannedIncomeScreen];

function CustomTabBar({
  activeIndex,
  onTabPress,
}: {
  activeIndex: number;
  onTabPress: (index: number) => void;
}) {
  return (
    <View className="bg-[#18181b] border-t border-t-[#27272a] pb-5">
      <BudgetProgressBar />
      <View className="flex-row justify-around pt-1">
        {TABS.map((tab, index) => {
          const isFocused = activeIndex === index;
          const color = isFocused ? "#A855F7" : "#71717a";

          return (
            <Pressable
              key={tab.key}
              onPress={() => onTabPress(index)}
              className="items-center py-1 flex-1"
            >
              <Text className={tab.iconSize}>{tab.icon}</Text>
              <Text className="text-[10px] mt-0.5" style={{ color }}>
                {tab.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  const pagerRef = useRef<WebPagerRef>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Budget tab is default

  const handlePageSelected = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleTabPress = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
    setActiveIndex(index);
  }, []);

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Hidden Slot to satisfy expo-router's layout requirement */}
      <View className="h-0 overflow-hidden">
        <Slot />
      </View>
      <WebPager
        ref={pagerRef}
        initialPage={2}
        onPageSelected={handlePageSelected}
      >
        {TAB_SCREENS.map((Screen, index) => (
          <View key={TABS[index].key} className="flex-1">
            <Screen />
          </View>
        ))}
      </WebPager>
      <CustomTabBar activeIndex={activeIndex} onTabPress={handleTabPress} />
    </View>
  );
}
