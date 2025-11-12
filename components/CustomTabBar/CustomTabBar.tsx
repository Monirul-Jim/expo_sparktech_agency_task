import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const tabs = [
    { name: "index", label: "My Tasks", icon: "home" }, 
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
            style={[
              styles.tabButton,
              isFocused && styles.focusedButtonWrapper,
            ]}
          >
            <View style={[
              styles.iconWrapper,
              isFocused && styles.focusedIconWrapper 
            ]}>
              <Ionicons
                name={tab.icon as keyof typeof Ionicons.glyphMap}
               
                size={isFocused ? 32 : 26}
                
                color={isFocused ? "#fff" : "#A3A3A3"}
              />
            </View>
            <Text style={[
              styles.label,
              isFocused && styles.focusedLabel, 
            ]}>
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
  tabButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: 'flex-start',
    height: '100%',
    paddingTop: 12, // Default padding for non-active tabs
  },

  // --- STYLES FOR THE ELEVATED, ACTIVE TAB ---
  focusedButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    top: -20, // **REDUCED ELEVATION** (was -25)
    height: 'auto',
    paddingTop: 0,
  },
  focusedIconWrapper: {
    width: 50, // **REDUCED SIZE** (was 60)
    height: 50, // **REDUCED SIZE** (was 60)
    borderRadius: 25, // **REDUCED RADIUS** (was 30)
    backgroundColor: "#7ED957",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  focusedLabel: {
    display: 'none',
  },
  // --- STYLES FOR INACTIVE TABS ---
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F2",
  },
  label: { fontSize: 12, color: "#6C757D", marginTop: 4 },
});