import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";

export default function SpecificDriverDetail() {
  const route = useRoute();
  const { drivers } = route.params;

  return (
    <>
      <StatusBar translucent={false} />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: drivers.imageURL }} style={styles.profileImage} />

        <View style={styles.infoCard}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{drivers.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{drivers.email || "N/A"}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{drivers.phone || "N/A"}</Text>

          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{drivers.city || "N/A"}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    backgroundColor: "#f8f9f9",
    alignItems: "center",
    flex: 1
  },
  profileImage: {
    width: '100%',
    height: 250,
    backgroundColor: "#ddd",
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
