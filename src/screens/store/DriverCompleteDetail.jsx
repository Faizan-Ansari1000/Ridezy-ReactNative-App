import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import FAInput from "../../components/FAInput";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FAIcon from "../../components/FAIcon";
import FAButton from "../../components/FAButton";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import ApiInstance from "../../config/apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DriverCompleteDetail() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const openGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            includeBase64: true,
            saveToPhotos: true,
        });

        if (!result.didCancel && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;
            setModel({ ...model, imageURL: imageUri });
        }
    };

    const sentDetails = useCallback(async () => {
        if (!model.name || !model.email || !model.phone || !model.cnicNumber || !model.area || !model.city || !model.imageURL) {
            return Toast.show({ type: "error", text2: "All fields are required" });
        }

        if (model.phone.length !== 11) {
            return ToastAndroid.show("Phone number must be 11 digits", ToastAndroid.LONG);
        }

        if (model.cnicNumber.length !== 13) {
            return ToastAndroid.show("CNIC number must be 13 digits", ToastAndroid.LONG);
        }

        if (!model.email.includes("@")) {
            return ToastAndroid.show("Invalid email (missing @)", ToastAndroid.LONG);
        }

        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                return ToastAndroid.show("User ID missing", ToastAndroid.LONG);
            }

            setLoading(true);
            const res = await ApiInstance.post("/userRoute/driverDetail", { ...model, userId, });

            Toast.show({ type: "success", text2: "Successfully Detail Saved" });
            navigation.navigate("Success");
        } catch (error) {
            console.log(error);
            const errorMsg = error.response?.data?.message || "Something went wrong";
            ToastAndroid.show(errorMsg, ToastAndroid.LONG);
        } finally {
            setLoading(false);
            setModel({}); // Optional: Reset only if needed
        }
    }, [model]);


    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <TouchableOpacity style={styles.imageWrapper} onPress={openGallery}>
                    {model.imageURL ? (
                        <Image
                            source={{ uri: model.imageURL }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <FAIcon name="photo-camera" size={24} color="#666" />
                    )}
                </TouchableOpacity>
                

                <FAInput
                    placeholder="Driver Name"
                    onChangeText={(e) => setModel({ ...model, name: e })}
                    value={model.name || ""}
                />
                <FAInput
                    placeholder="Email Address"
                    onChangeText={(e) => setModel({ ...model, email: e })}
                    value={model.email || ""}
                />
                <FAInput
                    placeholder="Phone number"
                    maxLength={12}
                    keyboardType="number-pad"
                    onChangeText={(e) => setModel({ ...model, phone: e })}
                    value={model.phone || ""}
                />
                <FAInput
                    placeholder="Cnic number (e.g. 42201XXXXXXXX)"
                    maxLength={15}
                    keyboardType="number-pad"
                    onChangeText={(e) => setModel({ ...model, cnicNumber: e })}
                    value={model.cnicNumber || ""}
                />
                <FAInput
                    placeholder="Street Abc House # 123"
                    onChangeText={(e) => setModel({ ...model, area: e })}
                    value={model.area || ""}
                />
                <FAInput
                    placeholder="City"
                    onChangeText={(e) => setModel({ ...model, city: e })}
                    value={model.city || ""}
                />

                <View style={styles.buttonWrapper}>
                    <FAButton
                        label={loading ? <ActivityIndicator /> : <Text>Save</Text>}
                        disabled={loading}
                        onPress={sentDetails}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingBottom: 50,
        paddingTop: 40
    },
    imageWrapper: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d5d8dc",
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
