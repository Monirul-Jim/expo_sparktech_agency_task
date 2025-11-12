import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { useActivatateUserMutation } from "@/redux/api/authApi";

export default function ActivateUser() {
    const { email } = useLocalSearchParams();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<(TextInput | null)[]>([]);
    const [activateUser, { isLoading, error }] = useActivatateUserMutation();
    console.log(error)
    const handleChange = (value: string, index: number) => {
        const copy = [...code];
        copy[index] = value.slice(-1);
        setCode(copy);

        // ✅ Auto move to next input
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // ✅ Backspace -> move to previous input
        if (e.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const onSubmit = async () => {
        const finalCode = code.join("");

        try {
            await activateUser({ email, code: finalCode }).unwrap();
            console.log("✅ Activation response:");

            router.replace("/login");
        } catch (err) {
            console.log("❌ Activation error:", err);

            alert("Invalid code, try again.");
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>6-digit code</Text>
                <Text style={styles.subtitle}>
                    Please enter the code sent to {"\n"}
                    <Text style={{ fontWeight: "600" }}>{email}</Text>
                </Text>

                <View style={styles.otpWrapper}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputsRef.current[index] = ref;
                            }}
                            style={styles.otpBox}
                            keyboardType="number-pad"
                            value={digit}
                            onChangeText={(val) => handleChange(val, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            maxLength={1}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={isLoading}>
                    <Text style={styles.buttonText}>
                        {isLoading ? "Confirming..." : "Confirm"}
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", paddingHorizontal: 28, backgroundColor: "#fff" },
    title: { fontSize: 26, fontWeight: "600", marginBottom: 8 },
    subtitle: { color: "#6C757D", marginBottom: 30 },
    otpWrapper: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
    otpBox: {
        width: 48,
        height: 48,
        backgroundColor: "#F1F5F2",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
    },
    button: { backgroundColor: "#7ED957", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
