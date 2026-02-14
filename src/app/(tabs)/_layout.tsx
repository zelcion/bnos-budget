import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#18181b",
          borderTopColor: "#27272a",
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#A855F7",
        tabBarInactiveTintColor: "#71717a",
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Budget",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>💰</Text>,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>💳</Text>,
        }}
      />
      <Tabs.Screen
        name="planned-expenses"
        options={{
          title: "Planned",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📅</Text>,
        }}
      />
      <Tabs.Screen
        name="planned-income"
        options={{
          title: "Income",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>💵</Text>,
        }}
      />
    </Tabs>
  );
}
