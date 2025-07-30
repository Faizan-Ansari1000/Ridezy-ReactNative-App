import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FAIcon from "../../components/FAIcon";

export default function OnBoarding2() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.skipBtn}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Image */}
            <Image
                source={require('../../assets/On2.jpg')}
                resizeMode="contain"
                style={styles.image}
            />

            {/* Paragraph */}
            <View style={styles.textWrapper}>
                <Text style={styles.heading}>Easy Rider</Text>
                <Text style={styles.para}>
                    Book your rides easily and quickly.{'\n'}
                    Let our drivers pick you up in minutes.{'\n'}
                    Enjoy smooth and affordable travel every time.
                </Text>
            </View>

            {/* Bottom circular button */}
            <TouchableOpacity style={styles.circleBtn}>
                <FAIcon name="keyboard-arrow-right" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        paddingHorizontal: 20,
    },
    skipBtn: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    skipText: {
        color: '#641e16',
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 300,
        marginTop: 80,
    },
    textWrapper: {
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#641e16',
        fontStyle: 'italic',
        marginBottom: 15,
    },
    para: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        lineHeight: 22,
    },
    circleBtn: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#641e16',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});
