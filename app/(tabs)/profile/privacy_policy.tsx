import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
       <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/profile")} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#7ED957" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Privacy Policy – Task Manager App</Text>
        <Text style={styles.text}>
          Your privacy is important to us. This Privacy Policy outlines how the Task Manager App
          handles your information and protects your data.
        </Text>

        <Text style={styles.subTitle}>1. Information Collection</Text>
        <Text style={styles.text}>
          The Task Manager App may collect limited information such as your name, email address, 
          and preferences — strictly for the purpose of enhancing your task management experience. 
          We do not collect sensitive personal information unnecessarily.
        </Text>

        <Text style={styles.subTitle}>2. Local Storage</Text>
        <Text style={styles.text}>
          Your tasks, subtasks, and user preferences are securely stored in our system or locally 
          on your device (depending on platform settings). This data is used solely to support app 
          features such as scheduling, notifications, and user customization.
        </Text>

        <Text style={styles.subTitle}>3. No Tracking</Text>
        <Text style={styles.text}>
          We do not use third-party trackers or intrusive analytics tools to monitor your behavior. 
          Any performance monitoring is strictly anonymized and used internally to improve the app experience.
        </Text>

        <Text style={styles.subTitle}>4. Static Data Display</Text>
        <Text style={styles.text}>
          If the app integrates with external tools (e.g., calendar, cloud storage), those services are 
          governed by their own privacy policies. We do not control or assume responsibility for their 
          data handling practices.
        </Text>

        <Text style={styles.subTitle}>5. Third-Party Services</Text>
        <Text style={styles.text}>
          We implement industry-standard measures to ensure your information is protected from unauthorized 
          access, alteration, or misuse. This includes encryption, secure servers, and routine maintenance.
        </Text>

        <Text style={styles.subTitle}>6. Data Security</Text>
        <Text style={styles.text}>
          You retain full control over your account data. You can delete or export your tasks and personal 
          information at any time through your profile settings (if applicable).
        </Text>

        <Text style={styles.subTitle}>7. Policy Updates</Text>
        <Text style={styles.text}>
          This Privacy Policy may be updated periodically. Any changes will be clearly communicated 
          within the app. Continued use after updates constitutes acceptance.
        </Text>

        <Text style={styles.text}>
          If you have any questions or concerns regarding privacy, please contact us at:
          support@taskmanagerapp.com
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
