import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Polygon } from "react-native-svg";
import { router } from "expo-router";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetAllTasksQuery } from "@/redux/api/taskApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const TaskCard = React.memo(({ item }: { item: any }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      router.push({
        pathname: "/task/[id]",
        params: { id: item._id },
      })
    }
  >
    <Svg style={styles.topShape} width="100" height="80">
      <Polygon points="100,0 100,80 40,0" fill="#F5FDEB" />
    </Svg>
    <Svg style={styles.bottomShape} width="120" height="80">
      <Polygon points="0,80 0,20 80,80" fill="#E9F7D6" />
    </Svg>

    <Image source={require("@/assets/expo_image.png")} style={styles.taskIcon} />

    <Text style={styles.taskTitle}>{item.title}</Text>
    <Text style={styles.taskDescription}>
      {item.description.split(" ").length > 20
        ? item.description.split(" ").slice(0, 20).join(" ") + "..."
        : item.description}
    </Text>
  </TouchableOpacity>
));

export default function HomeScreen() {
  const token = useAppSelector((state: RootState) => state.auth.token);

  const { data: users, isLoading: userLoading, refetch: refetchUser, isFetching: userFetching } =
    useGetMeQuery(undefined, { skip: !token });

  const {
    data,
    isLoading: tasksLoading,
    refetch: refetchTasks,
    isFetching: tasksFetching,
  } = useGetAllTasksQuery(undefined, { skip: !token });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchUser(), refetchTasks()]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchUser, refetchTasks]);

  if (!token) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.noAuth}>Please login to view tasks.</Text>
      </SafeAreaView>
    );
  }

  if (userLoading || tasksLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#7ED957" />
      </SafeAreaView>
    );
  }

  const tasks = data?.data?.myTasks || [];
  const user = users?.data || {};

  return (
    <SafeAreaView style={styles.container}>
   
      <View style={styles.header}>
        <Image
          source={{
            uri: user?.image
              ? `http://23.239.111.165:8001/${user.image}`
              : "https://i.pravatar.cc/150",
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcome}>
            Hello {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.role}>Welcome to Task Manager</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        renderItem={({ item }) => <TaskCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing || userFetching || tasksFetching} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  noAuth: { fontSize: 16, color: "gray" },

  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  welcome: { fontSize: 18, fontWeight: "600" },
  role: { fontSize: 13, color: "gray" },

  sectionTitle: { fontSize: 20, fontWeight: "600", marginHorizontal: 16, marginTop: 10, marginBottom: 8 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 14,
    overflow: "hidden",
    position: "relative",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E8F2E0",
  },
  taskIcon: { width: 30, height: 30, marginBottom: 10 },
  taskTitle: { fontSize: 15, fontWeight: "600", color: "#111", marginBottom: 4 },
  taskDescription: { fontSize: 13, color: "#666", maxWidth: "100%", lineHeight: 18 },

  topShape: { position: "absolute", top: 0, right: 0 },
  bottomShape: { position: "absolute", bottom: 0, left: 0 },
});
