import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { G, Rect, Path } from "react-native-svg";

interface WarningModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function WarningModal({ visible, message, onConfirm, onCancel }: WarningModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* SVG ICON */}
          <Svg width="60" height="60" viewBox="0 0 108 108" fill="none">
            <G filter="url(#filter0_d_2087_3958)">
              <Rect x="23" y="23" width="60" height="60" rx="4" fill="#FFFBEB" />
              <Path
                d="M65.9952 52.685C65.7469 52.6841 65.5089 52.5855 65.3328 52.4103C65.1575 52.2342 65.0587 51.996 65.0581 51.7475C65.0581 51.501 65.158 51.2593 65.3328 51.085C65.5089 50.9099 65.7469 50.8112 65.9952 50.8103C66.2421 50.8103 66.4838 50.9106 66.658 51.085C66.8323 51.2594 66.9327 51.501 66.9327 51.7474C66.9327 51.9943 66.8324 52.236 66.658 52.4102C66.4837 52.5845 66.2421 52.685 65.9952 52.685Z"
                fill="#FBBF24"
              />
              <Path
                d="M72.9573 74.0393H33.0426C31.5833 74.0393 30.2766 73.2849 29.5471 72.0215C28.8176 70.7577 28.8176 69.2489 29.5471 67.9856L49.5049 33.4177C50.2344 32.1544 51.541 31.4 53 31.4C54.459 31.4 55.7656 32.1544 56.4951 33.4178L64.7707 47.7513C65.0296 48.1995 64.8757 48.7731 64.4276 49.0319C63.9789 49.2905 63.4058 49.137 63.147 48.6888L54.8717 34.3554C54.481 33.679 53.7811 33.2746 53 33.2746C52.2189 33.2746 51.519 33.679 51.1283 34.3553L31.1709 68.9227C30.7802 69.5994 30.7802 70.4072 31.1709 71.084C31.5613 71.7608 32.2612 72.1646 33.0427 72.1646H72.9574C73.7389 72.1646 74.4384 71.7608 74.8292 71.084C75.2199 70.4072 75.2199 69.5994 74.8292 68.9226L66.8293 55.0664C66.5704 54.6181 66.7242 54.045 67.1724 53.786C67.6206 53.5271 68.1941 53.6806 68.453 54.1292L76.4529 67.9855C77.1824 69.2489 77.1824 70.7577 76.4529 72.0214C75.7231 73.2849 74.4168 74.0393 72.9574 74.0393H72.9573Z"
                fill="#FBBF24"
              />
              <Path
                d="M53.0001 59.7619C51.3459 59.7619 50.0005 58.4161 50.0005 56.7622V48.3022C50.0005 46.648 51.3459 45.3026 53.0001 45.3026C54.6543 45.3026 55.9997 46.648 55.9997 48.3022V56.7623C55.9997 58.4161 54.6543 59.7619 53.0001 59.7619V59.7619ZM53.0001 47.1775C52.3798 47.1775 51.8751 47.6821 51.8751 48.3021V56.7622C51.8751 57.3826 52.3798 57.8872 53.0001 57.8872C53.6204 57.8872 54.1251 57.3826 54.1251 56.7622V48.3022C54.1251 47.6822 53.6204 47.1775 53.0001 47.1775V47.1775ZM53.0001 68.0112C51.3459 68.0112 50.0005 66.6657 50.0005 65.0115C50.0005 63.3573 51.3459 62.0118 53.0001 62.0118C54.6543 62.0118 55.9997 63.3573 55.9997 65.0115C55.9997 65.8127 55.6877 66.566 55.1212 67.1325C54.5547 67.6991 53.8014 68.0112 53.0001 68.0112ZM53.0001 63.8865C52.3798 63.8865 51.8751 64.3911 51.8751 65.0115C51.8751 65.6319 52.3798 66.1365 53.0001 66.1365C53.3004 66.1365 53.5831 66.0193 53.7955 65.8069C53.9003 65.7027 53.9834 65.5787 54.0399 65.4422C54.0965 65.3057 54.1255 65.1593 54.1251 65.0115C54.1251 64.3911 53.6204 63.8865 53.0001 63.8865Z"
                fill="#FBBF24"
              />
            </G>
          </Svg>

          <Text style={styles.title}>Warning</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttons}>
            {onCancel && (
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
    marginTop: 10,
  },
  message: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    borderColor: "#A3A3A3",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: "center",
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#7ED957",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelText: { color: "#333", fontWeight: "500" },
  confirmText: { color: "#fff", fontWeight: "600" },
});
