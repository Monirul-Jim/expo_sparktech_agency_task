// app/(tabs)/TabLayout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRootNavigationState } from "expo-router";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";
import { Redirect } from "expo-router";
import { View, StyleSheet } from "react-native";
import CustomTabBar from "@/components/CustomTabBar/CustomTabBar";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigationState = useRootNavigationState();
  // const user = true;
  const user = useAppSelector((state: RootState) => state.auth.user);
  // Prevent navigation before root layout is ready
  if (!navigationState?.key) return null;
  // Redirect to login if user not found
  if (!user) {
    return <Redirect href="/orboarding" />;
  }
  return (
    <>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="task/index" options={{ title: "Add Task" }} />
        <Tabs.Screen name="profile/index" options={{ title: "Profile" }} />

      </Tabs>
      {/* <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
        <CustomTabBar />
      </View> */}
      {/* <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Exam",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.crop.circle" color={color} />
          ),
        }}
      />
    </Tabs> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});