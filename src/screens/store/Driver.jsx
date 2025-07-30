import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StatusBar,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import FAIcon from "../../components/FAIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiInstance from "../../config/apis/ApiInstance";
import FAModal from "../../components/FAModal";

export default function Driver() {

    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const [delIsOpen, setDelIsOpen] = useState(false)
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
                        <TouchableOpacity onPress={() => navigation.navigate('DriverDetail')}>
                            <FAIcon name="assignment" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )
            }
        });
    }, [navigation]);


    const getProfile = useCallback(async () => {
        const driverId = await AsyncStorage.getItem("userId");
        if (!driverId) {
            return ToastAndroid.show("Not Found your Profile Id", ToastAndroid.SHORT);
        }
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/profileRoute/profile/${driverId}`);
            setPostData(res.data.data);
        } catch (error) {
            ToastAndroid.show(
                `${error.response?.data?.message || "Failed to load profile"}`,
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useLayoutEffect(() => {
        getProfile();
    }, []);

    // logout
    const logOut = async () => {
        await AsyncStorage.removeItem('userId')
        setIsOpen(false)
        navigation.reset({ index: 0, routes: [{ name: 'Splash' }] })
    }

    return (
        <>
            {/* <FAModal
                transparent={true}
                visible={isOpen}
                onRequestClose={() => setIsOpen(false)}
                onPress={() => setIsOpen(false)}
                // onConfirm={logOut}
                message='Are your sure you want Delete Profile?'
                label="Ok"
            /> */}
            <FAModal
                transparent={true}
                visible={isOpen}
                onRequestClose={() => setIsOpen(false)}
                onPress={() => setIsOpen(false)}
                onConfirm={logOut}
                message='Are your sure you want Log out?'
                label="Ok"
            />
            <StatusBar
                // translucent={false}
                barStyle={"dark-content"}
                backgroundColor={"transparent"}
            />
            <ScrollView style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#641e16" />
                ) : postData ? (
                    <>
                        <View style={styles.profileContainer}>
                            <Image
                                source={{ uri: postData?.imageURL || "https://via.placeholder.com/120" }}
                                style={styles.profileImage}
                            />

                            <View style={styles.infoWrapper}>
                                <Text style={styles.label}>Name</Text>
                                <Text style={styles.value}>{postData.name}</Text>
                                <View style={styles.separator} />

                                <Text style={styles.label}>Email</Text>
                                <Text style={styles.value}>{postData.email}</Text>
                                <View style={styles.separator} />

                                <Text style={styles.label}>Phone</Text>
                                <Text style={styles.value}>{postData.phone}</Text>
                                <View style={styles.separator} />

                                <Text style={styles.label}>Address</Text>
                                <Text style={styles.value}>{postData.address}</Text>
                                <View style={styles.separator} />

                                <Text style={styles.label}>Role</Text>
                                <Text style={styles.value}>{postData.role}</Text>
                                <View style={styles.separator} />
                            </View>

                            <TouchableOpacity style={styles.logoutBtn} onPress={() => setIsOpen(true)}>
                                <Text style={styles.logoutText}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text style={styles.noProfile}>Not Found your Profile</Text>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        // backgroundColor: "rgba(0,0,0,0.1)",
    },
    profileContainer: {
        alignItems: "center",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 30,
        backgroundColor: "#eee",
    },
    infoWrapper: {
        width: "100%",
    },
    label: {
        fontSize: 13,
        color: "#888",
        marginLeft: 5,
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111",
        marginLeft: 5,
    },
    separator: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 10,
    },
    logoutBtn: {
        marginTop: 40,
    },
    logoutText: {
        color: "#641e16",
        fontSize: 16,
        fontWeight: "bold",
    },
    noProfile: {
        textAlign: "center",
        fontSize: 18,
        color: "gray",
        marginTop: 50,
    },
});
