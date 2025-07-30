import { useRoute } from "@react-navigation/native";
import { Image, Text, View, StyleSheet, StatusBar } from "react-native";
import FAIcon from "../../components/FAIcon";

export default function DriverDetail() {
    const route = useRoute();
    const { drivers } = route.params;

    return (
        <>
            <StatusBar translucent={false} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: drivers.imageURL }}
                        style={styles.image}
                    />

                    <Text style={styles.name}>{drivers.name || "N/A"}</Text>

                    <View style={styles.infoRow}>
                        <FAIcon name="phone" size={18} color="#641e16" />
                        <Text style={styles.infoText}>{drivers.phone || "N/A"}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <FAIcon name="id-card" size={18} color="#641e16" />
                        <Text style={styles.infoText}>{drivers.cnicNumber || "N/A"}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <FAIcon name="map-marker" size={18} color="#641e16" />
                        <Text style={styles.infoText}>
                            {drivers.area || "N/A"}, {drivers.city || "N/A"}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "100%",
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        elevation: 4,
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 15,
        backgroundColor: "#ddd",
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    infoText: {
        fontSize: 15,
        color: "#444",
        marginLeft: 10,
    },
});
