
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function Btn(props) {
  const { onPress, disabled, label } = props;

  return (
    <View style={Styles.wrapper}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[Styles.button, disabled && Styles.disabled]}
      >
        <Text style={Styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 15,
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    color: "#641e16",
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#f9e79f",
  },
});
