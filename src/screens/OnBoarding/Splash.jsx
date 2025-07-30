import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, View, StyleSheet } from "react-native";

export default function Splash() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.navigate('Login')
    }, [navigation])

    return (
        <>
            <View style={styles.container}>
                <Image source={require('../../assets/Splash.jpg')} resizeMode="contain" style={styles.background}
                />

                <View style={styles.overlay}>
                    <Text style={styles.text} onPress={() => navigation.navigate('OnBoarding1')}>Welcome Ridezy</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'white',
    },
    background: {
        width: 'auto',
        height: 'auto',
        flex: 1
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30
    },
    text: {
        color: 'black',
        fontSize: 44,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'Arial, Helvetica, sans-serif'
    }
});
