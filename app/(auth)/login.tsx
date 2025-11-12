
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Stack, router } from "expo-router";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/feature/authSlice";
import WarningModal from "@/components/WarningModal/WarningModal";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
interface FormData {
  email: string;
  password: string;
}
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === "object" && error != null && "message" in error;
}

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginUserMutation();
  const [remember, setRemember] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  // const onSubmit: SubmitHandler<FormData> = async (data) => {
  //   const res = await loginUser(data).unwrap();
  //   const user = res?.data?.user;
  //   dispatch(setUser({ user, token: res?.data?.token }))
  //   router.replace("/(tabs)");
  // };

const onSubmit: SubmitHandler<FormData> = async (data) => {
  try {
    const res = await loginUser(data).unwrap();
    const user = res?.data?.user;
    dispatch(setUser({ user, token: res?.data?.token }));
    router.replace("/(tabs)");
  } catch (err: unknown) {
    let message = "Something went wrong. Please try again.";

    if (isFetchBaseQueryError(err)) {
      const fetchError = err as FetchBaseQueryError;

      // 🧩 1️⃣ Handle network-level failures
      if (fetchError.status === "FETCH_ERROR") {
        const rawError = (fetchError as { error?: string }).error;
        message = rawError
          ? rawError
          : "Network error! Please check your internet connection.";
      }

      // 🧩 2️⃣ Handle backend JSON errors
      else if (typeof fetchError.data === "object" && fetchError.data !== null) {
        const data = fetchError.data as { error?: string; message?: string; status?: string };
        if (data.error) message = data.error; // 👈 handles “No user found”
        else if (data.message) message = data.message;
        else if (data.status) message = data.status;
      }
    } else if (isSerializedError(err)) {
      message = err.message ?? message;
    }

    setWarningMsg(message);
    setShowWarning(true);
    console.log("⚠️ Error:", message);
  }
};



  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Stay productive and take control of your tasks.
        </Text>

        {/* EMAIL */}
        <Text style={styles.label}>Email Address</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="michelle.rivera@example.com"
              placeholderTextColor="#A3A3A3"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••"
                placeholderTextColor="#A3A3A3"
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={22}
                  color="#6C757D"
                />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* REMEMBER ME */}
        <View style={styles.rememberRow}>
          <Checkbox
            value={remember}
            onValueChange={setRemember}
            color={remember ? "#7ED957" : undefined}
          />
          <Text style={styles.rememberText}>Remember me</Text>
        </View>


        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={styles.dividerBox}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* SIGN UP LINK */}
        <Text style={styles.signupText}>
          Don’t have an account?
          <Text style={styles.signupLink} onPress={() => router.push("/register")}>
            {" "}Sign Up
          </Text>
        </Text>
        <WarningModal
          visible={showWarning}
          message={warningMsg}
          onConfirm={() => setShowWarning(false)}
        />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 6,
  },
  subtitle: {
    color: "#6C757D",
    marginBottom: 24,
  },
  label: {
    fontWeight: "500",
    marginBottom: 6,
  },
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
  passwordInput: {
    flex: 1,
    marginRight: 8,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberText: {
    marginLeft: 6,
    color: "#6C757D",
  },
  button: {
    backgroundColor: "#7ED957",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  dividerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  orText: {
    marginHorizontal: 10,
    color: "#6C757D",
    fontWeight: "500",
  },
  signupText: {
    textAlign: "center",
    color: "#6C757D",
  },
  signupLink: {
    color: "#7ED957",
    fontWeight: "600",
  },
});
