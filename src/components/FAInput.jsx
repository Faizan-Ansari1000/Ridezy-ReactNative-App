import { StyleSheet, TextInput, View } from "react-native";

export default function FAInput(props) {
  const { placeholder, maxLength, keyboardType, onChangeText, value, secureTextEntry, multiline, numberOfLines } = props;

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={placeholder}
        maxLength={maxLength}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
        placeholderTextColor="#7f8c8d"
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d5d8dc",
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#2c3e50",
    backgroundColor: "#fff",
    marginHorizontal: 15
  },
});
