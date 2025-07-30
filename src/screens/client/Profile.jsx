import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import FAIcon from "../../components/FAIcon";
import FAModal from "../../components/FAModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ApiInstance from "../../config/apis/ApiInstance";
import Toast from "react-native-toast-message";

export default function Profile() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [delIsOpen, setDelIsOpen] = useState(false);
    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ paddingLeft: 10 }}>
                    <FAIcon name="arrow-back" size={24} />
                </View>
            ),
            headerRight: () => (
                <View style={{ paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                        <FAIcon name="settings" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const getProfile = async () => {
        const userId = await AsyncStorage.getItem("userId");
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/profileRoute/profile/${userId}`);
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message || "Something went wrong"}`, ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        getProfile();
    }, []);

    const logOut = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                return ToastAndroid.show("User ID not found", ToastAndroid.LONG);
            } else {
                // await AsyncStorage.removeItem("userId");
                navigation.reset({ index: 0, routes: [{ name: "Splash" }] });
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.message}`, ToastAndroid.LONG);
        }
    };

    // delete account
    const deleteAccount = async () => {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
            ToastAndroid.show('User not logged in', ToastAndroid.LONG);
            return;
        }

        try {
            setLoading(true);
            const response = await ApiInstance.delete(`/profileRoute/profile/${userId}`);
            Toast.show({ type: 'success', text1: 'Delete', text2: 'Account Successfully Deleted' });

            await AsyncStorage.clear(); 
            navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message || 'Something went wrong'}`, ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* delete modal */}
            <FAModal
                transparent={true}
                visible={delIsOpen}
                onRequestClose={() => setDelIsOpen(false)}
                message="Are you Sure. you want delete account ?"
                label="Yes! I agree"
                onPress={() => setDelIsOpen(false)}
                onConfirm={deleteAccount}
            // onConfirm={}
            />
            {/* logout modal */}
            <FAModal
                transparent={true}
                visible={isOpen}
                onRequestClose={() => setIsOpen(false)}
                message="Are you sure you want to log out?"
                label="Ok"
                onConfirm={logOut}
            />

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#641e16" style={styles.loader} />
                ) : postData ? (
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <TouchableOpacity>
                            <Image source={{ uri: postData.imageURL }} style={styles.profileImage} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit')}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>

                        {/* Profile Info Fields */}
                        <View style={styles.infoRow}>
                            <FAIcon name="person" size={20} color="#555" style={styles.infoIcon} />
                            <Text style={styles.value}>{postData.name}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <FAIcon name="alternate-email" size={20} color="#555" style={styles.infoIcon} />
                            <Text style={styles.value}>{postData.email}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <FAIcon name="location-city" size={20} color="#555" style={styles.infoIcon} />
                            <Text style={styles.value}>{postData.address}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <FAIcon name="phone" size={20} color="#555" style={styles.infoIcon} />
                            <Text style={styles.value}>{postData.phone}</Text>
                        </View>

                        {/* Extra Options */}
                        <View style={styles.optionSection}>
                            <TouchableOpacity style={styles.optionRow}>
                                <FAIcon name="event" size={20} color="#555" style={styles.infoIcon} />
                                <Text style={styles.optionText}>My Bookings</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionRow}>
                                <FAIcon name="notifications" size={20} color="#555" style={styles.infoIcon} />
                                <Text style={styles.optionText}>Notifications</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionRow}>
                                <FAIcon name="contact-support" size={20} color="#555" style={styles.infoIcon} />
                                <Text style={styles.optionText}>Help & Support</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionRow}>
                                <FAIcon name="settings-applications" size={20} color="#555" style={styles.infoIcon} />
                                <Text style={styles.optionText}>App Settings</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.optionRow} onPress={() => setIsOpen(true)}>
                                <FAIcon name="logout" size={20} color="red" style={styles.infoIcon} />
                                <Text style={[styles.optionText, { color: "red" }]}>Log Out</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionRow} onPress={() => setDelIsOpen(true)}>
                                <FAIcon name="delete" size={20} color="#641e16" style={styles.infoIcon} />
                                <Text style={[styles.deleteText, { color: "#641e16" }]}>Delete Account</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Profile not found</Text>
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#f8f9f9",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 70,
        marginBottom: 10,
        backgroundColor: "#eee",
        alignSelf: "center",
    },
    editText: {
        alignSelf: "center",
        color: "green",
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#d5d8dc",
        paddingBottom: 20,
        marginBottom: 15,
    },
    infoIcon: {
        marginRight: 10,
    },
    value: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
    },
    optionSection: {
        marginTop: 30,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 22,
        borderBottomWidth: 1,
        borderBottomColor: "#ececec",
    },
    optionText: {
        fontSize: 15,
        color: "#333",
        fontWeight: "500",
    },
    deleteText: {
        fontSize: 15,
        color: "#641e16",
        fontWeight: "500",
    },
    emptyState: {
        alignSelf: 'center',
    },
    emptyText: {
        paddingTop: 20
    }
});
