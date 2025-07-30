import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import ApiInstance from "../../config/apis/ApiInstance";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FAIcon from "../../components/FAIcon";

export default function DriverDetail() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getMyDetails = useCallback(async () => {
        const userId = await AsyncStorage.getItem("userId");
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/userRoute/driverDetail/${userId}`);
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getMyDetails();
    }, [getMyDetails]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditDetail')}>
                        <FAIcon name="assignment" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <>
            <StatusBar translucent={false} />
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <ActivityIndicator size="large" color="#641e16" />
                ) : postData ? (
                    <View style={styles.card}>
                        <Image source={{ uri: postData.imageURL }} style={styles.avatar} />
                        <Text style={styles.name}>{postData.name}</Text>

                        <View style={styles.fieldRow}>
                            <MaterialIcons name="email" size={20} color="#641e16" />
                            <Text style={styles.value}>{postData.email}</Text>
                        </View>

                        <View style={styles.fieldRow}>
                            <MaterialIcons name="phone" size={20} color="#641e16" />
                            <Text style={styles.value}>{postData.phone}</Text>
                        </View>

                        <View style={styles.fieldRow}>
                            <MaterialIcons name="badge" size={20} color="#641e16" />
                            <Text style={styles.value}>{postData.cnicNumber}</Text>
                        </View>

                        <View style={styles.fieldRow}>
                            <MaterialIcons name="home" size={20} color="#641e16" />
                            <Text style={styles.value}>{postData.area}</Text>
                        </View>

                        <View style={styles.fieldRow}>
                            <MaterialIcons name="location-city" size={20} color="#641e16" />
                            <Text style={styles.value}>{postData.city}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.empty}>No details found.</Text>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f8f9f9",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#641e16",
        marginBottom: 15,
    },
    fieldRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        width: "100%",
    },
    value: {
        fontSize: 16,
        marginLeft: 10,
        color: "#333",
        flexShrink: 1,
    },
    empty: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
    },
});
