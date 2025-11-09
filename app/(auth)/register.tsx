import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRegisterUserMutation } from "@/redux/api/authApi";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Stack, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
type RegisterFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    confirmPassword: string;
    agree: boolean;
};

export default function RegisterScreen() {
    const [registerUser, { isLoading, error, isSuccess }] = useRegisterUserMutation()
    const { control, handleSubmit, watch } = useForm<RegisterFormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            password: "",
            confirmPassword: "",
            agree: false,
        },
    });


    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    // ✅ ADD THESE HERE
    useEffect(() => {
        if (isSuccess) {
            router.replace("/activate_user");  // Go to verification screen after success
        }
    }, [isSuccess]);
    useEffect(() => {
        if (!error) return;

        // Check if error is FetchBaseQueryError type
        if ("data" in error && error.data) {
            const apiError = error.data as any;

            if (apiError?.error?.includes("duplicate key")) {
                alert("This email is already registered. Please login.");
            } else {
                alert(apiError?.message || "Registration failed.");
            }
        } else {
            // Fallback for SerializedError
            alert("Something went wrong, please try again.");
        }
    }, [error]);

    // useEffect(() => {
    //     if (error) {
    //         if (error?.data?.error?.includes("duplicate key")) {
    //             alert("This email is already registered. Please login.");
    //         } else {
    //             alert(error?.data?.message || "Registration failed.");
    //         }
    //     }
    // }, [error]);
    const onSubmit = async (data: RegisterFormValues) => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);
            formData.append("email", data.email);
            formData.append("password", data.password);
            if (data.address) formData.append("address", data.address);

            await registerUser(formData).unwrap();
            router.replace({ pathname: "/activate_user", params: { email: data.email } });

        } catch (err) {
            console.log("REGISTER ERROR:", err);
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={styles.title}>Create Your Account</Text>
                    <Text style={styles.subtitle}>
                        Join Task Manager today — organize better, work smarter, and stay in control of your day.
                    </Text>

                    {/* First Name */}
                    <Text style={styles.label}>First Name</Text>
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Kristin"
                                placeholderTextColor="#A3A3A3"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {/* Last Name */}
                    <Text style={styles.label}>Last Name</Text>
                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Cooper"
                                placeholderTextColor="#A3A3A3"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {/* Email */}
                    <Text style={styles.label}>Email Address</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. kristin.cooper@example.com"
                                placeholderTextColor="#A3A3A3"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {/* Address */}
                    <Text style={styles.label}>Address</Text>
                    <Controller
                        control={control}
                        name="address"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. 1234 Elm Street, Springfield"
                                placeholderTextColor="#A3A3A3"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {/* Password */}
                    <Text style={styles.label}>Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={styles.passwordInput}
                                    secureTextEntry={!showPass}
                                    placeholder="••••••"
                                    placeholderTextColor="#A3A3A3"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                                    <Ionicons name={showPass ? "eye" : "eye-off"} size={22} color="#6C757D" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    {/* Confirm Password */}
                    <Text style={styles.label}>Confirm Password</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={styles.passwordInput}
                                    secureTextEntry={!showConfirmPass}
                                    placeholder="••••••"
                                    placeholderTextColor="#A3A3A3"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                                    <Ionicons name={showConfirmPass ? "eye" : "eye-off"} size={22} color="#6C757D" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    {/* Terms Checkbox */}
                    <View style={styles.agreeRow}>
                        <Controller
                            control={control}
                            name="agree"
                            render={({ field: { onChange, value } }) => (
                                <Checkbox value={value} onValueChange={onChange} color={value ? "#7ED957" : undefined} />
                            )}
                        />
                        <Text style={styles.agreeText}>
                            I agree to the Terms & Conditions and Privacy Policy.
                        </Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.dividerRow}>
                        <View style={styles.line} />
                        <Text style={styles.or}>OR</Text>
                        <View style={styles.line} />
                    </View>

                    {/* Already have account */}
                    <Text style={styles.loginText}>
                        Already have an account?
                        <Text style={styles.loginLink} onPress={() => router.push("/login")}> Log In</Text>
                    </Text>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[styles.button, isLoading && { opacity: 0.7 }]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Ionicons name="reload" size={22} color="#fff" style={{ transform: [{ rotate: "360deg" }] }} />
                        ) : (
                            <Text style={styles.buttonText}>Continue</Text>
                        )}
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
        paddingTop: 40,
    },
    title: { fontSize: 28, fontWeight: "600", marginBottom: 6 },
    subtitle: { color: "#6C757D", marginBottom: 20 },
    label: { fontWeight: "500", marginBottom: 6 },
    input: {
        backgroundColor: "#F1F5F2",
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
    },
    passwordWrapper: {
        backgroundColor: "#F1F5F2",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    passwordInput: { flex: 1, marginRight: 8 },
    agreeRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    agreeText: { marginLeft: 8, color: "#6C757D", flex: 1 },
    dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
    line: { flex: 1, height: 1, backgroundColor: "#D9D9D9" },
    or: { marginHorizontal: 10, color: "#6C757D" },
    loginText: { textAlign: "center", color: "#6C757D", marginBottom: 24 },
    loginLink: { color: "#7ED957", fontWeight: "600" },
    button: { backgroundColor: "#7ED957", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
