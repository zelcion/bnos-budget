import { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { useExpenseStore } from "../stores/useExpenseStore";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function MonthSwitcher() {
  const { currentMonth, setCurrentMonth } = useExpenseStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempYear, setTempYear] = useState(currentMonth.year);
  const now = new Date();
  const isCurrentMonth =
    currentMonth.year === now.getFullYear() &&
    currentMonth.month === now.getMonth() + 1;

  const goBack = () => {
    const m = currentMonth.month === 1 ? 12 : currentMonth.month - 1;
    const y = currentMonth.month === 1 ? currentMonth.year - 1 : currentMonth.year;
    setCurrentMonth({ year: y, month: m });
  };

  const goForward = () => {
    const m = currentMonth.month === 12 ? 1 : currentMonth.month + 1;
    const y = currentMonth.month === 12 ? currentMonth.year + 1 : currentMonth.year;
    setCurrentMonth({ year: y, month: m });
  };

  const goToCurrent = () => {
    setCurrentMonth({ year: now.getFullYear(), month: now.getMonth() + 1 });
  };

  const openModal = () => {
    setTempYear(currentMonth.year);
    setModalVisible(true);
  };

  const selectMonth = (monthIndex: number) => {
    setCurrentMonth({ year: tempYear, month: monthIndex + 1 });
    setModalVisible(false);
  };

  const changeYear = (delta: number) => {
    setTempYear((prev) => prev + delta);
  };

  return (
    <View className="items-center pt-4 pb-1">
      <View className="flex-row items-center gap-6">
        <Pressable onPress={goBack} className="px-3 py-1">
          <Text className="text-2xl text-zinc-400">&#8249;</Text>
        </Pressable>
        <Pressable onPress={openModal}>
          <Text className="text-base font-semibold text-white">
            {MONTH_NAMES[currentMonth.month - 1]} {currentMonth.year}
          </Text>
        </Pressable>
        <Pressable onPress={goForward} className="px-3 py-1">
          <Text className="text-2xl text-zinc-400">&#8250;</Text>
        </Pressable>
      </View>
      {!isCurrentMonth && (
        <Pressable onPress={goToCurrent} className="mt-2 bg-zinc-800 rounded-full px-4 py-1">
          <Text className="text-zinc-400 text-xs">Back to Current Month</Text>
        </Pressable>
      )}

      {/* Month picker modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 items-center justify-center"
          onPress={() => setModalVisible(false)}
        >
          <Pressable className="bg-zinc-900 rounded-2xl p-6 w-80">
            {/* Year selector */}
            <View className="flex-row items-center justify-center gap-8 mb-6">
              <Pressable onPress={() => changeYear(-1)} className="px-3 py-1">
                <Text className="text-2xl text-zinc-400">&#8249;</Text>
              </Pressable>
              <Text className="text-xl font-semibold text-white">{tempYear}</Text>
              <Pressable onPress={() => changeYear(1)} className="px-3 py-1">
                <Text className="text-2xl text-zinc-400">&#8250;</Text>
              </Pressable>
            </View>

            {/* Month grid (4x3) */}
            <View className="gap-3">
              {[0, 1, 2, 3].map((row) => (
                <View key={row} className="flex-row gap-3">
                  {[0, 1, 2].map((col) => {
                    const monthIndex = row * 3 + col;
                    const isSelected =
                      tempYear === currentMonth.year &&
                      monthIndex + 1 === currentMonth.month;
                    return (
                      <Pressable
                        key={monthIndex}
                        onPress={() => selectMonth(monthIndex)}
                        className={`flex-1 py-3 rounded-lg items-center ${
                          isSelected ? "bg-purple-600" : "bg-zinc-800"
                        }`}
                      >
                        <Text className="text-white text-sm font-medium">
                          {MONTH_NAMES[monthIndex].slice(0, 3)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
