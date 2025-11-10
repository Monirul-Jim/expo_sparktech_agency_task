
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {

  const tabs = [
    { name: "index", label: "Home", icon: "home" },
    { name: "task/index", label: "Add Task", icon: "add" },
    { name: "profile/index", label: "Profile", icon: "person" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isFocused = state.routeNames[state.index] === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={styles.tabButton}
          >
            <View style={[styles.iconWrapper, isFocused && styles.active]}>
              <Ionicons
               name={tab.icon as keyof typeof Ionicons.glyphMap} 
                size={tab.name === "add_task" ? 30 : 26}
                color={isFocused ? "#fff" : "#A3A3A3"}
              />
            </View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#fff",
  },
  tabButton: { alignItems: "center" },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F2",
  },
  active: { backgroundColor: "#7ED957" },
  label: { fontSize: 12, color: "#6C757D", marginTop: 4 },
  labelActive: { color: "#7ED957", fontWeight: "600" },
});
