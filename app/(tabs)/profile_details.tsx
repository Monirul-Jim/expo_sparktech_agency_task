// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useGetMeQuery } from "@/redux/api/authApi";
// import { useAppSelector } from "@/redux/hooks";
// import { RootState } from "@/redux/store";
// import { router } from "expo-router";

// export default function ProfileDetails() {
//     const insets = useSafeAreaInsets();
//     const token = useAppSelector((state: RootState) => state.auth.token);
//     const { data } = useGetMeQuery(undefined, { skip: !token });

//     const user = data?.data;

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             {/* Header */}
//             <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
//                 <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
//                     <Ionicons name="chevron-back" size={28} color="#7ED957" />
//                 </TouchableOpacity>


//                 <Text style={styles.headerText}>My Profile</Text>

//                 <TouchableOpacity onPress={() => router.push("/update_profile")}>
//                     <Ionicons name="create-outline" size={22} color="#7ED957" />
//                 </TouchableOpacity>
//             </View>

//             {/* Profile Picture */}
//             <Image
//                 source={{ uri: user?.avatar || "https://i.pravatar.cc/150" }}
//                 style={styles.avatar}
//             />

//             {/* Name */}
//             <Text style={styles.name}>
//                 {user?.firstName} {user?.lastName}
//             </Text>

//             {/* Info Cards */}
//             <View style={styles.infoContainer}>
//                 <Info icon="person-circle-outline" label={`${user?.firstName} ${user?.lastName}`} />
//                 <Info icon="mail-outline" label={user?.email} />
//                 <Info icon="location-outline" label={user?.address || "No address provided"} />
//             </View>
//         </SafeAreaView>
//     );
// }

// function Info({ icon, label }: { icon: any; label: string }) {
//     return (
//         <View style={styles.infoBox}>
//             <Ionicons name={icon} size={18} color="#7ED957" style={{ marginRight: 8 }} />
//             <Text style={styles.infoText}>{label}</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: "#F8FDF6",
//         alignItems: "center",
//     },
//     header: {
//         width: "90%",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 15,
//     },
//     headerText: {
//         fontSize: 18,
//         fontWeight: "600",
//         color: "#7ED957",
//     },
//     avatar: {
//         width: 110,
//         height: 110,
//         borderRadius: 55,
//         marginTop: 10,
//         marginBottom: 12,
//     },
//     name: {
//         fontSize: 20,
//         fontWeight: "700",
//         marginBottom: 25,
//         color: "#222",
//     },
//     infoContainer: {
//         width: "88%",
//     },
//     infoBox: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#FFFFFF",
//         borderRadius: 12,
//         paddingVertical: 14,
//         paddingHorizontal: 12,
//         marginBottom: 12,
//         elevation: 3,
//     },
//     infoText: {
//         fontSize: 15,
//         color: "#444",
//     },
// });
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import { useState, useCallback } from "react";

export default function ProfileDetails() {
  const insets = useSafeAreaInsets();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const { data, refetch, isLoading, isFetching } = useGetMeQuery(undefined, { skip: !token });
  const user = data?.data;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  if (isLoading || isFetching) {
    return (
      <SafeAreaView style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#7ED957" />
        <Text style={{ marginTop: 10, color: "#555" }}>Loading Profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#7ED957" />
          </TouchableOpacity>

          <Text style={styles.headerText}>My Profile</Text>

          <TouchableOpacity onPress={() => router.push("/update_profile")}>
            <Ionicons name="create-outline" size={22} color="#7ED957" />
          </TouchableOpacity>
        </View>

        {/* Push content slightly downward */}
        <View style={{ height: 10 }} />

        {/* Profile Picture */}
        <Image
          source={{
            uri: user?.image
              ? `http://23.239.111.165:8001/${user.image}`  // show uploaded image
              : "https://i.pravatar.cc/150"                // fallback default avatar
          }}
          style={styles.avatar}
        />


        {/* Name */}
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>

        {/* Info Cards */}
        <View style={styles.infoContainer}>
          <Info icon="person-circle-outline" label={`${user?.firstName} ${user?.lastName}`} />
          <Info icon="mail-outline" label={user?.email} />
          <Info icon="location-outline" label={user?.address || "No address provided"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Info({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={styles.infoBox}>
      <Ionicons name={icon} size={18} color="#7ED957" style={{ marginRight: 8 }} />
      <Text style={styles.infoText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FDF6",
  },
  loaderBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FDF6",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7ED957",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 4,
    borderColor: "#E7FDE0",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 25,
    color: "#222",
  },
  infoContainer: {
    width: "88%",
    marginBottom: 25,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    elevation: 3,
  },
  infoText: {
    fontSize: 15,
    color: "#444",
  },
});
