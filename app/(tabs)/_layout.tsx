import React, { useMemo } from "react";
import { Tabs, Redirect } from "expo-router";
import { useRootNavigationState } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import CustomTabBar from "@/components/CustomTabBar/CustomTabBar";

export default function TabLayout() {
  const navigationState = useRootNavigationState();
  const user = useAppSelector((state: RootState) => state.auth.user);

  if (!navigationState?.key) return null;

  if (!user) {
    return <Redirect href="/orboarding" />;
  }

  const renderTabBar = useMemo(() => (props: any) => <CustomTabBar {...props} />, []);

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={renderTabBar}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="task/index" options={{ title: "Add Task" }} />
      <Tabs.Screen name="profile/index" options={{ title: "Profile" }} />
    </Tabs>
  );
}
