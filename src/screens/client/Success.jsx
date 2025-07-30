import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Success() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/success.jpg")} style={styles.image} resizeMode="contain" />
            <Text style={styles.message}>Your Acticity has been successfully perform!</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    image: {
        width: '100%',
        height: '50%',
    },
    message: {
        fontSize: 18,
        color: "#333",
        marginBottom: 40,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#641e16",
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
