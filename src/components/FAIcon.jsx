import React from "react";
import { View, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function FAIcon(props) {
    const { name, size,  color = "#2c3e50", style = {}, } = props;

    return (
        <View style={[styles.container, style]}>
            <MaterialIcons name={name} size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        // marginVertical: 6,
        // marginHorizontal: 6,
    },
});
