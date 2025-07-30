import { useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import FAIcon from "../../components/FAIcon";
import { ActivityIndicator, FlatList, Image, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import FAInput from "../../components/FAInput";
import ApiInstance from "../../config/apis/ApiInstance";

export default function Home() {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState("");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ paddingLeft: 10 }}>
                    <TouchableOpacity>
                        <FAIcon name="arrow-back" size={24} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => {
                return <View style={{ paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('TopTab')}>
                        <FAIcon name="arrow-forward-ios" size={24} />
                    </TouchableOpacity>
                </View>
            }
        })
    }, [navigation]);

    const getDrivers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get('/userRoute/driverDetail');
            console.log(res.data);
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG)
        } finally {
            setLoading(false);
        }
    }, []);


    // search functionality
    const filteredData = searchName
        ? postData.filter((item) => item.name.toLowerCase().includes(searchName.toLowerCase()))
        : postData

    useEffect(() => { getDrivers() }, [])

    return (
        <>
            <View style={styles.container}>
                <FAInput
                    placeholder="Search by Name"
                    onChangeText={(e) => setSearchName(e)}
                    value={searchName || ''}
                // style={styles.searchInput}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#641e16" />
                ) : postData ? (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            const isHighlight = item.name.toLowerCase() === searchName.toLowerCase();
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SpecificDriverDetail', { drivers: item })}
                                    style={styles.card}
                                >
                                    <Image source={{ uri: item.imageURL }} style={styles.avatar} />
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={[
                                                styles.nameText,
                                                isHighlight && styles.highlightText,
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                ) : (
                    <Text style={styles.noDataText}>No Drivers Found</Text>
                )}
            </View>
        </>
    )
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#f8f9f9",
        // padding: 16,
    },
    searchInput: {
        marginBottom: 12,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin:18
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: "#ddd",
    },
    nameText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    highlightText: {
        color: "#641e16",
    },
    noDataText: {
        textAlign: "center",
        color: "gray",
    },
});
