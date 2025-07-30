import { useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    ToastAndroid,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from "react-native";
import ApiInstance from "../../config/apis/ApiInstance";
import { useNavigation } from "@react-navigation/native";
import FAIcon from "../../components/FAIcon";

export default function RequestRides() {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ paddingLeft: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FAIcon name="arrow-back" size={24} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => {
                return (
                    <View style={{ paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('DriverCompleteDetail')}>
                            <FAIcon name="settings-accessibility" color={'black'} size={24} />
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, [navigation])

    const getAllRides = async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get("/userRoute/request");
            setPostData(res.data.data);
        } catch (error) {
            ToastAndroid.show(error.response?.data?.message || "Failed to fetch rides", ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllRides();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await ApiInstance.patch(`/userRoute/request/${id}`, { status });
            ToastAndroid.show(`Ride ${status}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            getAllRides();
        } catch (error) {
            ToastAndroid.show("Failed to update status", ToastAndroid.LONG);
        }
    };

    // const renderItem = ({ item }) => (
    //     <View style={styles.card}>
    //         <Text style={styles.label}>📱 Phone: {item.phone}</Text>
    //         <Text style={styles.label}>📍 Location: {item.location}</Text>
    //         <View style={styles.buttonRow}>
    //             <TouchableOpacity
    //                 style={styles.cancelButton}
    //                 onPress={() => updateStatus(item._id, "rejected")}
    //             >
    //                 <Text style={styles.cancelText}>Reject</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //                 style={styles.approveButton}
    //                 onPress={() => updateStatus(item._id, "approved")}
    //             >
    //                 <Text style={styles.approveText}>Approve</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // );

    return (
        <>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#641e16" />
                ) : postData.length === 0 ? (
                    <Text style={styles.noData}>No Rides Found</Text>
                ) : (
                    <FlatList
                        data={postData}
                        keyExtractor={(item) => item._id}
                        // renderItem={renderItem}
                        renderItem={({ item }) => (
                            <View>
                                <View style={styles.card}>
                                    <Text style={styles.label}>📱 Phone: {item.phone}</Text>
                                    <Text style={styles.label}>📍 Location: {item.location}</Text>
                                    <View style={styles.buttonRow}>
                                        <TouchableOpacity
                                            style={styles.cancelButton}
                                            onPress={() => updateStatus(item._id, "rejected")}
                                        >
                                            <Text style={styles.cancelText}>Reject</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.approveButton}
                                            onPress={() => updateStatus(item._id, "approved")}
                                        >
                                            <Text style={styles.approveText}>Approve</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        contentContainerStyle={{ paddingBottom: 30 }}
                    />
                )}
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
    },
    card: {
        padding: 20,
        backgroundColor: "#f8f9f9",
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    cancelButton: {
        borderColor: "#641e16",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    cancelText: {
        color: "#641e16",
        fontWeight: "bold",
    },
    approveButton: {
        backgroundColor: "#641e16",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    approveText: {
        color: "#fff",
        fontWeight: "bold",
    },
    noData: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 18,
        color: "gray",
    },
});
