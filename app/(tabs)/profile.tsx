import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { logout } from "@/redux/feature/authSlice";

export default function Profile() {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const { data, error, isLoading, isFetching } = useGetMeQuery(
    undefined,
    { skip: !token }
  );
  const dispatch = useAppDispatch();

  const user = data?.data;
  if (isLoading || isFetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user profile...</Text>
      </View>
    );
  }

  if (!token) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Please log in to view your profile.</Text>
      </View>
    );
  }
  if (error) {
    console.error("Profile fetch error:", error);
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Error loading profile. Your session may have expired.
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: user?.image
                ? `http://23.239.111.165:8001/${user.image}`  // show uploaded image
                : "https://i.pravatar.cc/150"                // fallback default avatar
            }}
            style={styles.avatar}
          />

        </View>

        {/* User Name */}
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>

        {/* Section 1 */}
        <View style={styles.card}>
          <MenuItem
            label="My Profile"
            onPress={() => router.push("/profile_details")}
          />
          <MenuItem label="Account Setting" onPress={() => router.push("/account_setting")} />
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>More</Text>

        {/* Section 2 */}
        <View style={styles.card}>
          <MenuItem label="Terms & Condition" onPress={() => { }} />
          <MenuItem label="Privacy policy" onPress={() => { }} />
          <MenuItem label="Help/Support" onPress={() => { }} />
          <MenuItem
            label="Log Out"
            onPress={() => {
              dispatch(logout());       // Clear Redux user + token
              router.replace("/login"); // Redirect to login
            }}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.menuRow} onPress={onPress}>
      <Ionicons name="person-circle-outline" size={22} color="#7ED957" />
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#7ED957" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#7ED957",
    height: 160,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: 20,
  },
  name: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 10,
    fontSize: 14,
    color: "#6C757D",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    borderRadius: 16,
    paddingVertical: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuLabel: { marginLeft: 10, flex: 1, fontSize: 15 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#888',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});