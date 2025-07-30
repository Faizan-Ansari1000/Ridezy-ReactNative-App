import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
import FAInput from "../components/FAInput";
import Toast from "react-native-toast-message";
import { launchImageLibrary } from "react-native-image-picker";
import FAIcon from "../components/FAIcon";
import FAButton from "../components/FAButton";
import ApiInstance from "../config/apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const [showRoles, setShowRoles] = useState(false);
    const success = 'Successfully Profile Created'
    const navigation = useNavigation();

    const openGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
            includeBase64: true,
        });
        if (!result.didCancel && result.assets?.length > 0) {
            const imageUri = result.assets[0].uri;
            setModel({ ...model, imageURL: imageUri });
        }
    };

   const createProfile = async () => {
    if (!model.name || !model.email || !model.phone || !model.address || !model.role) {
        return Toast.show({ type: "error", text2: "All fields are required" });
    }

    try {
        setLoading(true);
        const res = await ApiInstance.post('/profileRoute/profile', model);

        const { role } = res.data;
        Toast.show({ type: 'success', text2: `${role} profile created` });

        await AsyncStorage.setItem('userId', res.data.data.userId); // ✅ store correct userId
        if (role === 'user') {
            navigation.navigate('Home');
        } else if (role === 'driver') {
            navigation.navigate('RequestRides');
        }
    } catch (error) {
        console.log(error);
        ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
    } finally {
        setLoading(false);
        setModel({});
    }
};

    const roles = ["user", "driver", "admin"];

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {/* Profile image upload */}
                <TouchableOpacity style={styles.imagePicker} onPress={openGallery}>
                    {model.imageURL ?
                        (
                            <Image source={{ uri: model.imageURL }} style={styles.image} />
                        ) :
                        (
                            <FAIcon name="camera-alt" size={28} color="#641e16" />
                        )}
                </TouchableOpacity>
                {/* Peragraph email */}
                <Text style={styles.paragraph}>
                    Note: Make sure to use the same registered email you used while signing up to create your profile.
                </Text>

                {/* Inputs */}
                <View style={{ gap: 15 }}>
                    <FAInput
                        placeholder="Full Name"
                        onChangeText={(e) => setModel({ ...model, name: e })}
                        value={model.name || ""}
                    />
                    <FAInput
                        placeholder="Email Address"
                        onChangeText={(e) => setModel({ ...model, email: e })}
                        value={model.email || ""}
                    />
                    <FAInput
                        placeholder="Phone Number"
                        onChangeText={(e) => setModel({ ...model, phone: e })}
                        value={model.phone || ""}
                        keyboardType="number-pad"
                        maxLength={12}
                    />
                    <FAInput
                        placeholder="Address"
                        onChangeText={(e) => setModel({ ...model, address: e })}
                        value={model.address || ""}
                    />

                    {/* Role Selector */}
                    <TouchableOpacity
                        style={styles.roleSelect}
                        onPress={() => setShowRoles(!showRoles)}
                    >
                        <Text style={styles.roleText}>
                            {model.role ? model.role : "Select Role"}
                        </Text>
                        <FAIcon name={showRoles ? "arrow-drop-up" : "arrow-drop-down"} size={22} color="#641e16" />
                    </TouchableOpacity>

                    {showRoles &&
                        roles.map((r) => (
                            <TouchableOpacity
                                key={r}
                                onPress={() => {
                                    setModel({ ...model, role: r });
                                    setShowRoles(false);
                                }}
                                style={styles.roleItem}
                            >
                                <Text style={{ color: "#333", fontSize: 16, textTransform: "capitalize" }}>
                                    {r}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    {/* Save Button */}
                    <FAButton
                        disabled={loading}
                        onPress={createProfile}
                        label={
                            loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white" }}>Save</Text>
                        }
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingTop: 35
    },
    imagePicker: {
        alignSelf: "center",
        backgroundColor: "#f8f9f9",
        borderRadius: 100,
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#d5d8dc",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    paragraph: {
        color: '#555',
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 25,
        marginVertical: 25
    },
    roleSelect: {
        borderWidth: 1,
        borderColor: "#d5d8dc",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15
    },
    roleText: {
        fontSize: 16,
        color: "#333",
        textTransform: "capitalize",
    },
    roleItem: {
        borderWidth: 1,
        borderColor: "#d5d8dc",
        borderRadius: 15,
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginTop: 8,
        backgroundColor: "#f9f9f9",
        marginHorizontal: 15
    },
});