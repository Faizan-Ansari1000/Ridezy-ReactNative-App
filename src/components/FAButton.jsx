import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function FAButton(props) {
  const { onPress, disabled, label } = props;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, disabled && styles.disabled]}
      >
        {label}
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#641e16",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 15
  },
  label: {
    fontSize: 18,
    color: "#eaecee",
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#abb2b9",
  },
});
