import React from "react";
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

export default function AddTask() {
  const router = useRouter();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (formData: { title: string; description: string }) => {
    if (!token) {
      Alert.alert("Login Required", "Please log in to create a task.");
      return;
    }

    try {
      const res = await createTask(formData).unwrap();

      Alert.alert("Success", "Task created successfully.");
      reset();
      if (res?.data) {
        router.push("/")
      }
    } catch (err: any) {
      Alert.alert("Error", err?.data?.message || "Failed to create task");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26} color="#7ED957" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Task</Text>
          <View style={{ width: 26 }} />
        </View>

        <View style={styles.content}>
          {/* Title */}
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

          {/* Description */}
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

          {/* Button */}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
  },
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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});
