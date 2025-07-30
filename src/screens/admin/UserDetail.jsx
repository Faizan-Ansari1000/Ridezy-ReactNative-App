import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function UserDetail() {
    const route = useRoute();
    const { details } = route.params;

    return (
        <>
            <StatusBar translucent={false} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <View style={styles.container}>
                <View style={styles.card}>
                    <MaterialIcons name="person" size={40} color="#641e16" style={styles.icon} />
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{details.name || "N/A"}</Text>

                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{details.email || "N/A"}</Text>

                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.value}>{details.phone || "N/A"}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 15,
        padding: 20,
        elevation: 4,
        alignItems: "center",
    },
    icon: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#888",
        alignSelf: "flex-start",
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        alignSelf: "flex-start",
        marginBottom: 5,
    },
});
