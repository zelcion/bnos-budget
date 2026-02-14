import { View, Text, Pressable } from "react-native";

export default function PlannedIncomeScreen() {
  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <Text className="text-gray-400 text-center py-12">
        No planned income yet
      </Text>
      <Pressable className="bg-green-600 rounded-xl py-3 mx-4">
        <Text className="text-white text-center font-semibold">
          Add Planned Income
        </Text>
      </Pressable>
    </View>
  );
}
