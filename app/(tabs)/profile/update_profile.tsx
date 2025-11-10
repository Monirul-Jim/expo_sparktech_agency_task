import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useUpdateUserMutation, useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { router } from "expo-router";

export default function UpdateProfile() {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const { data } = useGetMeQuery(undefined, { skip: !token });
  const user = data?.data;

  const [image, setImage] = useState(user?.avatar || null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      address: user?.address || "",
    },
  });
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,       // <-- enable cropping
      aspect: [1, 1],            // <-- force square crop (perfect for profile pics)
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("address", values.address);

      if (image && !image.startsWith("http")) {
        let fileName = image.split("/").pop();
        let fileType = fileName.split(".").pop();

        formData.append("file", {
          uri: image,
          name: fileName,
          type: `image/${fileType}`,
        } as any);
      }

      await updateUser(formData).unwrap();
      Alert.alert("Success", "Profile Updated Successfully!");
      router.push('/(tabs)/profile/profile_details');
      //   onPress={() => router.push("/(tabs)/profile")}
    } catch (err: any) {
      Alert.alert("Error", err?.data?.message || "Update failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile/profile_details")}>
          <Ionicons name="chevron-back" size={28} color="#7ED957" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Profile Image Section */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{
            uri: image
              ? image                     // show new picked image
              : user?.image
                ? `http://23.239.111.165:8001/${user.image}`  // server image
                : "https://i.pravatar.cc/150"                 // fallback avatar
          }}
          style={styles.avatar}
        />


        <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
          <Ionicons name="camera-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>


      {/* Form */}
      <View style={styles.form}>
        <Label text="First Name" />
        <Input control={control} name="firstName" placeholder="e.g. Kristin" />

        <Label text="Last Name" />
        <Input control={control} name="lastName" placeholder="e.g. Cooper" />

        <Label text="Email Address" />
        <Input control={control} name="email" placeholder="e.g. kristin@example.com" />

        <Label text="Address" />
        <Input control={control} name="address" placeholder="e.g. 1234 Elm Street" />

        {/* Update Button */}
        <TouchableOpacity style={styles.updateBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.updateText}>{isLoading ? "Updating..." : "Update"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

function Input({ control, name, placeholder }: any) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.inputBox}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FDF8" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginTop: 6,
    alignItems: "center",
  },

  headerTitle: { fontSize: 18, fontWeight: "600" },

  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: "relative", // important
    overflow: "hidden",   // so icon stays inside circle
    alignSelf: "center"
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#00000080", // slight transparency
    padding: 6,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  form: { marginTop: 25, paddingHorizontal: 18 },

  label: {
    marginTop: 14,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
  },

  inputBox: {
    backgroundColor: "#F2FFE9",
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C6F5A7",
  },

  input: { fontSize: 14, color: "#333" },

  updateBtn: {
    backgroundColor: "#7ED957",
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 30,
  },

  updateText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
