import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useGetSingleTaskQuery, useDeleteTaskMutation } from "@/redux/api/taskApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const { data, isLoading } = useGetSingleTaskQuery(id, { skip: !token });
  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();

  if (!data?.data) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#7ED957" />
      </SafeAreaView>
    );
  }

  const task = data.data;

  const handleDelete = async () => {
    await deleteTask(id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button + Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#7ED957" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tasks Details</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.card}>
          {/* Task Title */}
          <Text style={styles.label}>Task Title</Text>
          <Text style={styles.value}>{task.title}</Text>

          {/* Task Description */}
          <Text style={[styles.label, { marginTop: 16 }]}>Task Description</Text>
          <Text style={styles.description}>{task.description}</Text>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Ionicons name="trash" size={16} color="#FF4B4B" />
              <Text style={styles.deleteText}>Delete Task</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => router.push({ pathname: "/task/edit/[id]", params: { id } })}
            >
              <Ionicons name="create-outline" size={16} color="#4CAF50" />
              <Text style={styles.editText}>Edit Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

  actions: {
    flexDirection: "row",
    marginTop: 20,
    gap:15
  },

  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFECEC",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  deleteText: { marginLeft: 6, color: "#FF4B4B", fontWeight: "600" },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9FCE3",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  editText: { marginLeft: 6, color: "#4CAF50", fontWeight: "600" },
});
