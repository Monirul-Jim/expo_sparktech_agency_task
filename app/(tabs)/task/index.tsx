import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";

import { useCreateTaskMutation } from "@/redux/api/taskApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import WarningModal from "@/components/WarningModal/WarningModal";
import SuccessModal from "@/components/SuccessModal/SuccessModal";

export default function AddTask() {
  const router = useRouter();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: { title: "", description: "" },
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirm = useCallback(async () => {
    setShowConfirmModal(false);
    const formData = getValues();

    if (!token) {
      Alert.alert("Login Required", "Please log in to create a task.");
      return;
    }

    try {
      await createTask(formData).unwrap();
      setShowSuccessModal(true);
      reset();
    } catch (err: any) {
      Alert.alert("Error", err?.data?.message || "Failed to create task");
    }
  }, [createTask, getValues, reset, token]);

  const onSubmit = useCallback(() => {
    setShowConfirmModal(true);
  }, []);

  const handleBack = useCallback(() => router.back(), [router]);
  const handleSuccessOk = useCallback(() => {
    setShowSuccessModal(false);
    router.push("/");
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <WarningModal
          visible={showConfirmModal}
          message="Are you sure you want to add this task?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmModal(false)}
        />

        <SuccessModal
          visible={showSuccessModal}
          message="Task has been added successfully."
          onOk={handleSuccessOk}
        />

        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={26} color="#7ED957" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Task</Text>
          <View style={{ width: 26 }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Task Title</Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Task title is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={[styles.input, error && { borderColor: "red" }]}
                  placeholder="e.g. Design Landing Page Header"
                  value={value}
                  onChangeText={onChange}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />

          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, { height: 90, textAlignVertical: "top" }]}
                placeholder="e.g. Include logo, navigation, and CTA button with brand color"
                value={value}
                onChangeText={onChange}
                multiline
              />
            )}
          />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Task</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  content: { paddingHorizontal: 16, marginTop: 10 },
  label: { fontSize: 14, marginBottom: 6, fontWeight: "500" },
  input: {
    backgroundColor: "#F1F5F2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#F1F5F2",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#7ED957",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  error: { color: "red", fontSize: 12, marginTop: -10, marginBottom: 10 },
});
