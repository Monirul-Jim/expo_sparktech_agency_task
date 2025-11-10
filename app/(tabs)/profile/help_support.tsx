import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
type FAQ = {
    question: string;
    answer: string;
};

const faqs: FAQ[] = [
    {
        question: "How do I create a new task?",
        answer:
            'Tap the "Add Task" button on the navigation bar. Fill in the task title, due date, priority, and other details — then tap "Save".',
    },
    {
        question: "How can I view task details?",
        answer: "Simply tap on any task to see more detailed information.",
    },
    {
        question: "Can I mark a task as favorite or important?",
        answer: "Yes! Open the task and tap the star or priority indicator.",
    },
    {
        question: "How do I edit or delete a task?",
        answer: "Open the task and choose either edit or delete from the options.",
    },
    {
        question: "Is my data secure?",
        answer: "Your data is stored securely and is not shared with any third party.",
    },
];

export default function HelpSupportScreen() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/profile")} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={22} color="#7ED957" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help/Support</Text>
            </View>

            <ScrollView style={styles.container}>
                <Text style={styles.header}>FAQs</Text>

                {faqs.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <TouchableOpacity style={styles.row} onPress={() => toggle(index)}>
                            <Text style={styles.question}>{item.question}</Text>
                            <Ionicons
                                name={openIndex === index ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="#7A7A7A"
                            />
                        </TouchableOpacity>

                        {openIndex === index && (
                            <View style={styles.answerBox}>
                                <Text style={styles.answer}>{item.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}

                <Text style={styles.subHeader}>Need More Help?</Text>

                <View style={styles.helpCard}>
                    <View style={styles.helpRow}>
                        <Ionicons name="chatbubbles-outline" size={34} color="#6FCF43" />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.mailText}>
                                Mail Us: <Text style={styles.mailHighlight}>support@taskmanagerapp.com</Text>
                            </Text>
                            <Text style={styles.supportText}>
                                Our help desk is available 24/7 to support your workflow.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 14,
        backgroundColor: "#F8FFF4",
    },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 10,
        elevation: 2, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
    },

    question: {
        fontSize: 14.5,
        fontWeight: "500",
        color: "#2E2E2E",
    },

    answerBox: {
        paddingHorizontal: 14,
        paddingTop: 8,
        paddingBottom: 14,
    },

    answer: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },

    subHeader: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 22,
        marginBottom: 10,
    },

    helpCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },

    helpRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    mailText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },

    mailHighlight: {
        color: "#6FCF43",
    },

    supportText: {
        fontSize: 13,
        color: "#666",
        marginTop: 3,
        width: 230,
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

    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111",
    },
});
