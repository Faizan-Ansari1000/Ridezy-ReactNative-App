import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";
import ApiInstance from "../../config/apis/ApiInstance";
import { launchImageLibrary } from "react-native-image-picker";


export default function EditDetail() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleImagePick = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true, saveToPhotos: true });

        if (!result.didCancel && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;
            setModel({ ...model, imageURL: imageUri })
        }
    };

    const handleUpdate = useCallback(async () => {
        const userId = await AsyncStorage.getItem("userId");

        if (!model.name || !model.phone || !model.area || !model.city || !model.imageURL) {
            return ToastAndroid.show("All fields are required", ToastAndroid.LONG);
        }
        if (model.phone.length < 11) {
            return ToastAndroid.show("Wrong phone number", ToastAndroid.LONG);
        }

        try {
            setLoading(true);
            const res = await ApiInstance.put(`/userRoute/driverDetail/${userId}`, model);
            ToastAndroid.show("Successfully updated", ToastAndroid.LONG);
            navigation.goBack();
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    }, [model]);

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={handleImagePick} style={styles.imageWrapper}>
                {model.imageURL ? (
                    <Image source={{ uri: model.imageURL }} style={styles.image} />
                ) : (
                    <Text style={styles.imageText}>Open Camera</Text>
                )}
            </TouchableOpacity>

            <TextInput
                placeholder="Name"
                style={styles.input}
                value={model.name}
                onChangeText={(text) => setModel({ ...model, name: text })}
            />
            <TextInput
                placeholder="Phone"
                keyboardType="numeric"
                style={styles.input}
                value={model.phone}
                onChangeText={(text) => setModel({ ...model, phone: text })}
            />
            <TextInput
                placeholder="Area"
                style={styles.input}
                value={model.area}
                onChangeText={(text) => setModel({ ...model, area: text })}
            />
            <TextInput
                placeholder="City"
                style={styles.input}
                value={model.city}
                onChangeText={(text) => setModel({ ...model, city: text })}
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Update Details</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f8f9f9",
        justifyContent: "center",
    },
    imageWrapper: {
        alignSelf: "center",
        marginBottom: 20,
        backgroundColor: "#eee",
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    imageText: {
        color: "#888",
    },
    input: {
        borderWidth: 1,
        borderColor: "#d5d8dc",
        borderRadius: 15,
        paddingVertical: 18,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#641e16",
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
