import { useState } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import FAIcon from "../../components/FAIcon";

export default function AdminProfile() {

    const [adminData] = useState({
        name: "Admin Faizan",
        email: "admin@example.com",
        phone: "+92 300 1234567",
        role: "Super Admin",
        city: "Karachi",
        image:
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    });



    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: () => console.log("Logged out") },
        ]);
    };

    return (
        <>
            <StatusBar translucent={false} backgroundColor={"#fff"} barStyle={"dark-content"} />
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: adminData.image }} style={styles.avatar} />

                <Text style={styles.name}>{adminData.name}</Text>
                <Text style={styles.email}>{adminData.email}</Text>

                <View style={styles.card}>
                    <FAIcon name="phone" size={20} color="#641e16" />
                    <Text style={styles.cardText}>{adminData.phone}</Text>
                </View>

                <View style={styles.card}>
                    <FAIcon name="admin-panel-settings" size={20} color="#641e16" />
                    <Text style={styles.cardText}>{adminData.role}</Text>
                </View>

                <View style={styles.card}>
                    <FAIcon name="location-city" size={20} color="#641e16" />
                    <Text style={styles.cardText}>{adminData.city}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Admin Stats</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Drivers</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>24</Text>
                            <Text style={styles.statLabel}>Users</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>5</Text>
                            <Text style={styles.statLabel}>Offers</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <FAIcon name="logout" size={20} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        alignItems: "center",
        backgroundColor: "#f8f9f9",
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginTop: 20,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#641e16",
    },
    email: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        width: "100%",
        borderRadius: 12,
        elevation: 2,
        marginVertical: 6,
    },
    cardText: {
        fontSize: 16,
        marginLeft: 12,
        color: "#333",
    },
    section: {
        width: "100%",
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#641e16",
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statBox: {
        backgroundColor: "#fff",
        flex: 1,
        marginHorizontal: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        elevation: 2,
    },
    statNumber: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#641e16",
    },
    statLabel: {
        fontSize: 14,
        color: "#777",
        marginTop: 5,
    },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#641e16",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginTop: 40,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 10,
    },
});
