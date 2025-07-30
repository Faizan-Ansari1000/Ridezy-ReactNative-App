import { useNavigation } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import FAInput from "../../../components/FAInput";
import FAButton from "../../../components/FAButton";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiInstance from "../../../config/apis/ApiInstance";
import FAIcon from "../../../components/FAIcon";

export default function LocationForm() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.goBack()}>
                        <FAIcon name="arrow-back" size={24} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => {
                return <View>
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => navigation.navigate('Approvel')}>
                        <FAIcon name="check-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            }
        })
    }, [navigation])

    const sentRequest = useCallback(async () => {
        if (!model.phone?.trim() || !model.location?.trim()) {
            return Toast.show({ type: 'error', text2: 'Phone & Exact Location are must required for your ride' });
        }

        if (model.phone.length < 11) {
            return ToastAndroid.show('Phone number is too short', ToastAndroid.LONG);
        }

        const userId = await AsyncStorage.getItem('userId');
        console.log("User ID from AsyncStorage:", userId);

        if (!userId || userId.length !== 24) {
            return ToastAndroid.show('Invalid or missing user ID. Please login again.', ToastAndroid.LONG);
        }

        try {
            setLoading(true);
            const res = await ApiInstance.post('/userRoute/request', { ...model, userId, });
            console.log("Ride request response:", res.data);
            navigation.navigate('Success');
        } catch (error) {
            console.log("Ride request failed:", error.response?.data || error.message);
            ToastAndroid.show(`${error.response?.data?.message || 'Request failed'}`, ToastAndroid.LONG);
        } finally {
            setLoading(false);
            setModel({});
        }
    }, [model]);


    return (
        <View style={styles.container}>
            {/* Inputs centered vertically */}
            <View style={styles.formContainer}>
                <FAInput
                    placeholder="Phone number e.g 0300XXXXXXX"
                    onChangeText={(e) => setModel({ ...model, phone: e })}
                    value={model.phone || ""}
                    keyboardType="number-pad"
                    maxLength={12}
                />
                <FAInput
                    placeholder="Exact-Full Location"
                    numberOfLines={4}
                    multiline
                    onChangeText={(e) => setModel({ ...model, location: e })}
                    value={model.location || ""}
                />
            </View>

            <View>
                <FAButton
                    label={loading ? <ActivityIndicator /> : <Text style={{ color: 'white' }}>Send Request</Text>}
                    disabled={loading}
                    onPress={sentRequest}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});
