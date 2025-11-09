import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AccountSettingScreen() {
    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
                    <Ionicons name="chevron-back" size={26} color="#7ED957" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Account Setting</Text>

                {/* Right placeholder to keep title centered */}
                <View style={{ width: 26 }} />
            </View>

            {/* CARD OPTIONS */}
            <View style={styles.settingBox}>
                <TouchableOpacity style={styles.option} onPress={() => router.push("/change-password")}>
                    <View style={styles.optionLeft}>
                        <Ionicons name="lock-closed-outline" size={20} color="#7ED957" />
                        <Text style={styles.optionText}>Change Password</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#7ED957" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, styles.deleteOption]}>
                    <View style={styles.optionLeft}>
                        <Ionicons name="person-remove-outline" size={20} color="red" />
                        <Text style={[styles.optionText, { color: "red" }]}>Delete Account</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FDF8",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingTop: 6,
        paddingBottom: 20,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },

    settingBox: {
        marginTop: 18,
        width: "90%",
        alignSelf: "center",
        gap: 14,
    },

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

    optionLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    optionText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },

    deleteOption: {
        borderColor: "red",
    },
});
