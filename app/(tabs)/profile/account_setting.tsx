import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import WarningModal from "@/components/WarningModal/WarningModal";
import SuccessModal from "@/components/SuccessModal/SuccessModal";

export default function AccountSettingScreen() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Simulate account deletion API
  const handleDeleteAccount = async () => {
    setShowConfirmModal(false);
    try {
      // TODO: Call your delete account API here
      // await deleteAccountApi();

      // Simulate success
      setShowSuccessModal(true);
    } catch (err) {
      console.log("Delete account failed", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Confirmation Modal */}
      <WarningModal
        visible={showConfirmModal}
        message="Are you sure you want to permanently delete your account? This action cannot be undone."
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Success Modal */}
      <SuccessModal
        visible={showSuccessModal}
        message="Your account has been deleted successfully."
        onOk={() => {
          setShowSuccessModal(false);
          router.push("/(tabs)/profile");
        }}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="chevron-back" size={26} color="#7ED957" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Account Setting</Text>

        <View style={{ width: 26 }} />
      </View>

      {/* CARD OPTIONS */}
      <View style={styles.settingBox}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/(tabs)/profile/change_password")}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="lock-closed-outline" size={20} color="#7ED957" />
            <Text style={styles.optionText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#7ED957" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.deleteOption]}
          onPress={() => setShowConfirmModal(true)}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="person-remove-outline" size={20} color="red" />
            <Text style={[styles.optionText, { color: "red" }]}>Delete Account</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FDF8" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingTop: 6, paddingBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  settingBox: { marginTop: 18, width: "90%", alignSelf: "center", gap: 14 },
  option: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  optionText: { fontSize: 15, fontWeight: "500", color: "#333" },
  deleteOption: { borderColor: "red" },
});
