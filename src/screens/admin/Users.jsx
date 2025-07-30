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
} from "react-native"; import ApiInstance from "../../config/apis/ApiInstance";
import BackIcon from "../../components/BackIcon";
import FAInput from "../../components/FAInput";
;

export default function Users() {
    const navigation = useNavigation();
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackIcon />,
        });
    }, [navigation]);

    const getUsers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get("/profileRoute/profile");
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
        getUsers();
    }, []);


    const filteredData = searchName
        ? postData.filter((item) =>
            item.name.toLowerCase().includes(searchName.toLowerCase())
        )
        : postData;

    return (
        <>
            <FAInput placeholder="Search by name...." onChangeText={(e) => setSearchName(e)} value={searchName || ''} />
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#641e16" />
                ) : filteredData.length > 0 ? (
                    <FlatList
                        data={filteredData}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate("UserDetail", { details: item })}
                            >
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.list}
                    />
                ) : (
                    <Text style={styles.noUsersText}>No users found.</Text>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: "#fff", // you can enable this if needed
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    email: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    noUsersText: {
        fontSize: 16,
        textAlign: "center",
        color: "#888",
        marginTop: 20,
    },
});
