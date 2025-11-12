import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SuccessModalProps {
  visible: boolean;
  message: string;
  onOk: () => void;
}

export default function SuccessModal({ visible, message, onOk }: SuccessModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Success</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.okBtn} onPress={onOk}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    width: 280,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  okBtn: {
    backgroundColor: "#7ED957",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  okText: { color: "#fff", fontWeight: "600" },
});
