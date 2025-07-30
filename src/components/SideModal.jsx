import { Modal, Text, TouchableOpacity, View, Animated, Dimensions, StyleSheet, StatusBar } from "react-native";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function SideModal(props) {
    const { visible, onRequestClose, onPress, label = "Close", onConfirm } = props;

    const slideAnim = useRef(new Animated.Value(width)).current;
    const navigation = useNavigation();

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: width,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onRequestClose}
        >
            <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={onRequestClose}
            />

            <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminProfile')}>
                    <Text style={styles.buttonText}>{label}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onPress}>
                    <Text style={styles.cancelButtonText} onConfirm={onConfirm}>Cancel</Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: '#e5e7e9',
        marginTop: -StatusBar.currentHeight || 0
    },
    drawer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '70%',
        height: '100%',
        backgroundColor: 'transparent',
        padding: 20,
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    button: {
        backgroundColor: "#641e16",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#f8f9f9",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        borderColor: '#641e16',
        marginTop: 15,
        borderWidth: 1
    },
    cancelButtonText: {
        color: "#641e16",
        fontSize: 16,
    },
});
