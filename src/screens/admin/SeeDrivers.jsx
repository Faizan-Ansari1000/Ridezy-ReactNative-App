import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import BackIcon from "../../components/BackIcon";
import ApiInstance from "../../config/apis/ApiInstance";
import FAInput from "../../components/FAInput";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function SeeDrivers() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState("");
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackIcon />,
        });
    }, [navigation]);

    const getDrivers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get("/userRoute/driverDetail");
            console.log(res.data);
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(
                `${error?.response?.data?.message || "Something went wrong"}`,
                ToastAndroid.LONG
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getDrivers();
    }, []);

    const filteredData = searchName
        ? postData.filter((item) =>
            item.name.toLowerCase().includes(searchName.toLowerCase())
        )
        : postData;

    return (
        <>
            <FAInput
                placeholder="Search by name"
                onChangeText={(e) => setSearchName(e)}
                value={searchName || ""}
            />

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#641e16" style={{ marginTop: 20 }} />
                ) : postData.length > 0 ? (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.list}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const isHighlighted =
                                item.name.toLowerCase() === searchName.toLowerCase();
                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.card,
                                        isHighlighted && { borderColor: "#641e16", borderWidth: 1.5 },
                                    ]}
                                    onPress={() => navigation.navigate("DetailDriver", { drivers: item })}
                                >
                                    <MaterialIcons name="drive-eta" size={28} color="#641e16" style={styles.icon} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.phone}>{item.phone}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                ) : (
                    <Text style={styles.noDriversText}>No Drivers Found</Text>
                )}
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: "#fff",
    },
    list: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        elevation: 3,
    },
    icon: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    phone: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    noDriversText: {
        fontSize: 16,
        textAlign: "center",
        color: "#888",
        marginTop: 20,
    },
});
