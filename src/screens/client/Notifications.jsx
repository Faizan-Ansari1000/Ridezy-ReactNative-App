// screens/Notifications.js
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  StyleSheet,
  Linking,
} from 'react-native';
import ApiInstance from '../../config/apis/ApiInstance';

export default function Notifications() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiInstance.get('/userRoute/notification');
      console.log(res.data);
      setPostData(res.data.data);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#641e16" style={{ marginTop: 30 }} />
      ) : postData && postData.length > 0 ? (
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={postData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 12 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              {item?.link ? (
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(item.link)}
                >
                  View More →
                </Text>
              ) : null}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>No Notifications Found</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  message: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
  },
  link: {
    fontSize: 14,
    color: '#2980b9',
    fontWeight: '600',
  },
  noData: {
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
    fontSize: 16,
  },
});
