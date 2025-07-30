import { Modal, View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function FAModal(props) {

  const { transparent = true, visible, onRequestClose, message, onConfirm, label } = props;

  return (
    <>
      <Modal
        transparent={transparent}
        visible={visible}
        onRequestClose={onRequestClose}
        animationType="fade"
      >
        <View style={styles.backdrop}>
          <View style={styles.modalContainer}>
            {/* Cancel Icon */}
            <TouchableOpacity onPress={onRequestClose} style={styles.cancelIcon}>
              <MaterialIcons name="cancel" size={24} color="#888" />
            </TouchableOpacity>

            {/* Message */}
            <Text style={styles.messageText}>{message}</Text>

            {/* Confirm Button */}
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: '30%',
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    position: "relative",
    elevation: 5,
    justifyContent: 'center',
  },
  cancelIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  messageText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#641e16",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

