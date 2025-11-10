import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/profile")} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#7ED957" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Condition</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Terms & Conditions</Text>
        <Text style={styles.text}>
          Welcome to the Task Manager App. By accessing or using this application,
          you agree to the following terms and conditions:
        </Text>

        <Text style={styles.subTitle}>1. Use of the App</Text>
        <Text style={styles.text}>
          This app is designed to help users create, manage, and track personal or
          professional tasks efficiently. By using the app, you agree to use it
          responsibly and only for lawful purposes.
        </Text>

        <Text style={styles.subTitle}>2. Accuracy of Information</Text>
        <Text style={styles.text}>
          All tasks, notes, and other information entered by the user are stored
          securely. While we strive to maintain accurate task management
          functionality, the app is not responsible for missed deadlines,
          incorrect entries, or user-generated errors.
        </Text>

        <Text style={styles.subTitle}>3. User Responsibility</Text>
        <Text style={styles.text}>
          Users are solely responsible for managing their tasks, reminders, and
          any personal or professional outcomes related to the completion or
          non-completion of tasks created within the app.
        </Text>

        <Text style={styles.subTitle}>4. Data Collection</Text>
        <Text style={styles.text}>
          We respect your privacy. The Task Manager App may collect limited
          personal data (such as name, email, and usage patterns) solely for
          improving user experience. No data is shared with third parties without
          user consent.
        </Text>

        <Text style={styles.subTitle}>5. Limitation of Liability</Text>
        <Text style={styles.text}>
          We are not liable for any loss of productivity, missed deadlines, or
          damages resulting from your use of the app. The app is a productivity
          tool and should be used at your discretion.
        </Text>

        <Text style={styles.subTitle}>6. Third-Party Links</Text>
        <Text style={styles.text}>
          If the app connects to any third-party tools (e.g., calendar, email),
          we are not responsible for their data policies or service availability.
          Use of such services is subject to their respective terms.
        </Text>

        <Text style={styles.subTitle}>7. Changes to Terms</Text>
        <Text style={styles.text}>
          We reserve the right to update these Terms & Conditions at any time.
          Continued use of the app following any changes will constitute your
          acceptance of those revised terms.
        </Text>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FFF4" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E7FFCB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10, color: "#111" },
  subTitle: { fontSize: 14, fontWeight: "600", marginTop: 14, marginBottom: 6, color: "#222" },
  text: { color: "#555", fontSize: 14, lineHeight: 20 },
});
