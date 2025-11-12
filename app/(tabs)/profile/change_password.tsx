import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import WarningModal from "@/components/WarningModal/WarningModal";
import SuccessModal from "@/components/SuccessModal/SuccessModal";

type FormValues = { current: string; newPass: string; confirm: string; };

export default function ChangePasswordScreen() {
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: { current: "", newPass: "", confirm: "" },
  });
  const newPassword = watch("newPass");

  const onSubmit = (data: FormValues) => {
    setConfirmModal(true); // show confirmation modal first
  };

  const handleConfirmUpdate = () => {
    setConfirmModal(false);
    // TODO: API call to update password
    setSuccessModal(true); // show success modal
  };

  const handleSuccessOk = () => {
    setSuccessModal(false);
    router.push("/(tabs)/profile/account_setting"); // redirect
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile/account_setting")}>
          <Ionicons name="chevron-back" size={26} color="#7ED957" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* Current Password */}
        <Text style={styles.label}>Type Password</Text>
        <View style={styles.inputBox}>
          <Controller
            control={control}
            name="current"
            rules={{ required: "Current password is required" }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                secureTextEntry={!show.current}
                style={styles.input}
              />
            )}
          />
          <TouchableOpacity onPress={() => setShow({ ...show, current: !show.current })}>
            <Ionicons name={show.current ? "eye-off-outline" : "eye-outline"} size={20} color="#7ED957" />
          </TouchableOpacity>
        </View>
        {errors.current && <Text style={styles.error}>{errors.current.message}</Text>}

        {/* New Password */}
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputBox}>
          <Controller
            control={control}
            name="newPass"
            rules={{
              required: "New password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                secureTextEntry={!show.newPass}
                style={styles.input}
              />
            )}
          />
          <TouchableOpacity onPress={() => setShow({ ...show, newPass: !show.newPass })}>
            <Ionicons name={show.newPass ? "eye-off-outline" : "eye-outline"} size={20} color="#7ED957" />
          </TouchableOpacity>
        </View>
        {errors.newPass && <Text style={styles.error}>{errors.newPass.message}</Text>}

        {/* Confirm Password */}
        <Text style={styles.label}>New Confirm Password</Text>
        <View style={styles.inputBox}>
          <Controller
            control={control}
            name="confirm"
            rules={{ validate: (value) => value === newPassword || "Passwords do not match" }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                secureTextEntry={!show.confirm}
                style={styles.input}
              />
            )}
          />
          <TouchableOpacity onPress={() => setShow({ ...show, confirm: !show.confirm })}>
            <Ionicons name={show.confirm ? "eye-off-outline" : "eye-outline"} size={20} color="#7ED957" />
          </TouchableOpacity>
        </View>
        {errors.confirm && <Text style={styles.error}>{errors.confirm.message}</Text>}

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={styles.updateBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </View>

      {/* CONFIRMATION MODAL */}
      <WarningModal
        visible={confirmModal}
        message="Are you sure you want to change your password?"
        onConfirm={handleConfirmUpdate}
        onCancel={() => setConfirmModal(false)}
      />

      {/* SUCCESS MODAL */}
      <SuccessModal
        visible={successModal}
        message="Your password has been changed successfully."
        onOk={handleSuccessOk}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FDF8" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 4,
  },

  headerTitle: { fontSize: 18, fontWeight: "600" },

  form: { marginTop: 25, paddingHorizontal: 18 },

  label: {
    marginBottom: 6,
    marginTop: 12,
    fontSize: 13,
    fontWeight: "500",
    color: "#444",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2FFE9",   // light green tint like design
    borderWidth: 1,
    borderColor: "#C6F5A7",
    borderRadius: 8,
    height: 44,                   // <<< EXACT height
    paddingHorizontal: 12,        // tighter inner padding
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  updateBtn: {
    marginTop: 30,
    backgroundColor: "#7ED957",
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  updateText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  error: { color: "red", fontSize: 12, marginTop: 3 },
});
