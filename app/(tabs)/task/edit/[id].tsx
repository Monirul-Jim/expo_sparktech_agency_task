import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useGetSingleTaskQuery } from "@/redux/api/taskApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import React from "react";
type FormValues = {
    title: string;
    description: string;
};

export default function EditTask() {
    const { id } = useLocalSearchParams();
    const token = useAppSelector((state: RootState) => state.auth.token);

    const { data, isLoading } = useGetSingleTaskQuery(id, { skip: !token });

    const { control, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    // Load data into form when fetched
    React.useEffect(() => {
        if (data?.data) {
            reset({
                title: data.data.title,
                description: data.data.description,
            });
        }
    }, [data]);

    const onSubmit = async (formData: FormValues) => {
        console.log('something doing', formData)
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#7ED957" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                   <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                     <Ionicons name="chevron-back" size={22} color="#7ED957" />
                   </TouchableOpacity>
                   <Text style={styles.headerTitle}>Tasks Details</Text>
                 </View>

            <ScrollView contentContainerStyle={{ padding: 18 }}>
                {/* Task Title */}
                <Text style={styles.label}>Task Title</Text>
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="e.g. Design Landing Page Header"
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                {/* Description */}
                <Text style={styles.label}>Description</Text>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="e.g. Include logo, navigation, and CTA button with brand color"
                            style={[styles.input, styles.textArea]}
                            multiline
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                {/* Update Button */}
                <TouchableOpacity style={styles.updateBtn} onPress={handleSubmit(onSubmit)}>

                    <Text style={styles.updateText}>Update Task</Text>

                </TouchableOpacity>

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
        padding: 18,
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
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#111" },

    label: { fontSize: 14, fontWeight: "600", color: "#444", marginBottom: 6, marginTop: 14 },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: "#DDEFD0",
        fontSize: 14,
    },

    textArea: { height: 110, textAlignVertical: "top" },

    updateBtn: {
        backgroundColor: "#7ED957",
        borderRadius: 8,
        paddingVertical: 14,
        marginTop: 25,
        alignItems: "center",
    },
    updateText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
