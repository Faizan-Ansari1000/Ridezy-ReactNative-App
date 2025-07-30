import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FAIcon from "../../components/FAIcon";
import FAButton from "../../components/FAButton";
import Btn from "../../components/Btn";

export default function Welcome() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Top content */}
            <View>
                <Image
                    source={require('../../assets/welcome.jpg')}
                    resizeMode="contain"
                    style={styles.image}
                />

                <View style={styles.textWrapper}>
                    <Text style={styles.heading}>Welcome</Text>
                    <Text style={styles.para}>
                        Have a Better Sharing Experience
                    </Text>
                </View>
            </View>

            {/* Bottom Buttons */}
            <View style={styles.bottomWrapper}>
                <FAButton label="Create an Account" onPress={() => navigation.navigate('SignUp')} />
                <Btn label="Login" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
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
    },
    para: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        lineHeight: 22,
    },
    bottomWrapper: {
        marginBottom: 40,
    },
});
