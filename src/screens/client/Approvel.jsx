import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiInstance from "../../config/apis/ApiInstance";

export default function Approvel() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getApprovelMyRequests = useCallback(async () => {
        const userId = await AsyncStorage.getItem("userId");

        if (!userId) {
            return ToastAndroid.show("User ID not found", ToastAndroid.LONG);
        }

        try {
            setLoading(true);
            const res = await ApiInstance.get(`/userRoute/request/${userId}`);
            setPostData(res.data?.data || []);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(
                `${error.response?.data?.message || "Something went wrong"}`,
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getApprovelMyRequests();
    }, []);

    return (
        <>
            <StatusBar translucent={false} barStyle={'dark-content'} backgroundColor={'transparent'} />
            <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? 25 : 0 }]}>
                {loading ? (
                    <ActivityIndicator size="large" color="#641e16" />
                ) : postData.length === 0 ? (
                    <Text style={styles.emptyText}>No requests found.</Text>
                ) : (
                    <FlatList
                        data={postData}
                        keyExtractor={(item, index) => item._id || index.toString()}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.card}>
                                <Text style={styles.statusText}>Status: {item.status}</Text>
                                <Text style={styles.dateText}>
                                    {new Date(item.createdAt).toLocaleString()}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    card: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: "#641e16",
        elevation: 2,
    },
    statusText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    dateText: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
    emptyText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 40,
        color: "#999",
    },
});
