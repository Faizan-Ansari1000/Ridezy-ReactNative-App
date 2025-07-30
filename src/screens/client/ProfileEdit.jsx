import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import FAInput from "../../components/FAInput";
import { launchImageLibrary } from "react-native-image-picker";
import FAIcon from "../../components/FAIcon";
import FAButton from "../../components/FAButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiInstance from "../../config/apis/ApiInstance";
import Toast from "react-native-toast-message";

export default function ProfileEdit() {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);

    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true, saveToPhotos: true });
        if (!result.didCancel && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri
            setModel({ ...model, imageURL: imageUri })
        }
    };

    const updateProfile = async () => {
        const userId = await AsyncStorage.getItem('userId');
        try {
            setLoading(true);
            const res = await ApiInstance.put(`/profileRoute/profile/${userId}`,model)
            Toast.show({ type: 'success', text2: 'Successfully Profile Updated' })
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG)
        } finally {
            setLoading(false);
            setModel({})
        }
    }


    return (
        <>
            <StatusBar translucent={false} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <TouchableOpacity onPress={openGallery} style={styles.imagePicker}>
                        {model.imageURL ? (
                            <Image source={{ uri: model.imageURL }} resizeMode="cover" style={styles.imagePreview} />
                        ) : (
                            <FAIcon name="photo-camera" size={34} color="#fff" />
                        )}
                    </TouchableOpacity>


                    <FAInput
                        placeholder="Name"
                        onChangeText={(e) => setModel({ ...model, name: e })}
                        value={model.name || ''}
                    />
                    <FAInput
                        placeholder="Address"
                        onChangeText={(e) => setModel({ ...model, address: e })}
                        value={model.address || ''}
                    />
                    <FAInput
                        placeholder="Phone"
                        onChangeText={(e) => setModel({ ...model, phone: e })}
                        value={model.phone || ''}
                    />

                    <FAButton
                        label={loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Saved</Text>}
                        disabled={loading}
                        onPress={updateProfile}
                    />
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#f8f9f9',
    },
    imagePicker: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#abb2b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        overflow: 'hidden', // 👈 important
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});