import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import FAIcon from "../../components/FAIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiInstance from "../../config/apis/ApiInstance";

export default function History() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ paddingLeft: 10 }}>
          <FAIcon name="arrow-back" size={24} />
        </View>
      ),
    });
  }, [navigation]);

  const mySentRequests = useCallback(async () => {
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      return ToastAndroid.show("User ID not found", ToastAndroid.LONG);
    }

    try {
      setLoading(true);
      const res = await ApiInstance.get(`/userRoute/request/${userId}`);
      setPostData(res.data?.data || []);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        error.response?.data?.message || "Failed to load requests",
        ToastAndroid.LONG
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    mySentRequests();
  }, [mySentRequests]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#641e16" />
      ) : postData.length === 0 ? (
        <Text style={styles.emptyText}>No requests found.</Text>
      ) : (
        <FlatList
          data={postData}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.fieldText}>Phone: {item.phone}</Text>
              <Text style={styles.fieldText}>Location: {item.location}</Text>
              <Text style={styles.dateText}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9f9",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#641e16",
    elevation: 2,
  },
  fieldText: {
    fontSize: 16,
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    color: "#999",
  },
});
