import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useGetSingleTaskQuery, useDeleteTaskMutation } from "@/redux/api/taskApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import WarningModal from "@/components/WarningModal/WarningModal";
import SuccessModal from "@/components/SuccessModal/SuccessModal";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const token = useAppSelector((state: RootState) => state.auth.token);
  const taskId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id]);

  const [isDeleted, setIsDeleted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data, isLoading } = useGetSingleTaskQuery(taskId, { skip: !token });
  const [deleteTask] = useDeleteTaskMutation();

  const task = data?.data;

  const handleDelete = useCallback(async () => {
    setShowConfirmModal(false);
    try {
      await deleteTask(taskId).unwrap();
      setIsDeleted(true);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Delete task failed", err);
    }
  }, [deleteTask, taskId]);

  const handleEdit = useCallback(() => {
    router.push({ pathname: "/task/edit/[id]", params: { id: taskId } });
  }, [taskId]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleSuccessOk = useCallback(() => {
    setShowSuccessModal(false);
    router.push("/");
  }, []);

  if (isLoading && !isDeleted) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#7ED957" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WarningModal
        visible={showConfirmModal}
        message="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmModal(false)}
      />

      <SuccessModal
        visible={showSuccessModal}
        message="Task has been deleted successfully."
        onOk={handleSuccessOk}
      />


      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#7ED957" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>

      {!isDeleted && task && (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={styles.card}>
            <Text style={styles.label}>Task Title</Text>
            <Text style={styles.value}>{task.title}</Text>

            <Text style={[styles.label, { marginTop: 16 }]}>Task Description</Text>
            <Text style={styles.description}>{task.description}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => setShowConfirmModal(true)}
              >
                <Ionicons name="trash" size={16} color="#FF4B4B" />
                <Text style={styles.deleteText}>Delete Task</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
                <Ionicons name="create-outline" size={16} color="#4CAF50" />
                <Text style={styles.editText}>Edit Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FFF4" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    left: 16,
    backgroundColor: "#ECFFC8",
    padding: 6,
    borderRadius: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    elevation: 2,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#333" },
  value: { fontSize: 16, fontWeight: "500", marginTop: 4 },
  description: { fontSize: 14, marginTop: 6, color: "#555", lineHeight: 20 },
  actions: { flexDirection: "row", marginTop: 20, gap: 15 },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "#FFECEC",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteText: {
    marginLeft: 6,
    color: "#000",
    fontWeight: "600",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
    backgroundColor: "#E9FCE3",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editText: {
    marginLeft: 6,
    color: "#000",
    fontWeight: "600",
  },
});
