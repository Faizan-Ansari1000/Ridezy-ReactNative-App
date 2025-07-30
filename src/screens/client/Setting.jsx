import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView,
    Dimensions,
    ToastAndroid,
    ActivityIndicator,
    Image,
} from 'react-native';
import FAIcon from '../../components/FAIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiInstance from '../../config/apis/ApiInstance'
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


const primaryColor = '#641e16';
const borderColor = '#d5d8dc';

export default function Setting() {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const navigation = useNavigation();

    const getProfile = async () => {
        const userId = await AsyncStorage.getItem('userId')
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/profileRoute/profile/${userId}`)
            console.log(res.data);
            setPostData(res.data.data)
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    const toggleNotification = () => setNotificationsEnabled(!notificationsEnabled);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => console.log('User Logged Out') },
        ]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Profile Section */}
            {loading ? <ActivityIndicator style={{ paddingTop: 15, }} color={'#460809'} /> : (
                <View style={styles.profileSection}>
                    <Image style={styles.avatar} source={{ uri: postData.imageURL }} resizeMode='contain' />
                    <View>
                        <Text style={styles.profileName}>{postData.name}</Text>
                        <Text style={styles.profileEmail}>{postData.email}</Text>
                    </View>
                </View>
            )}

            {/* ACCOUNT */}
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.card}>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Home', { screen: 'Profile' })}>
                    <View style={styles.rowLeft}>
                        <FAIcon name="person" size={20} color={primaryColor} />
                        <Text style={styles.rowText}>Profile</Text>
                    </View>
                    <FAIcon name="arrow-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.row}>
                    <View style={styles.rowLeft}>
                        <FAIcon name="lock" size={20} color={primaryColor} />
                        <Text style={styles.rowText}>Change Password</Text>
                    </View>
                    <FAIcon name="arrow-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.row}>
                    <View style={styles.rowLeft}>
                        <FAIcon name="credit-card" size={20} color={primaryColor} />
                        <Text style={styles.rowText}>Payment Methods</Text>
                    </View>
                    <FAIcon name="arrow-right" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            {/* PREFERENCES */}
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.rowLeft}>
                        <FAIcon name="notifications" size={20} color={primaryColor} />
                        <Text style={styles.rowText}>Push Notifications</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.toggleBox, notificationsEnabled && styles.toggleOn]}
                        onPress={toggleNotification}
                    >
                        <View style={[styles.toggleThumb, notificationsEnabled && styles.toggleThumbOn]} />
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <View style={styles.rowLeft}>
                        <FAIcon name="dark-mode" size={20} color={primaryColor} />
                        <Text style={styles.rowText}>Dark Mode</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.toggleBox, darkMode && styles.toggleOn]}
                        onPress={toggleDarkMode}
                    >
                        <View style={[styles.toggleThumb, darkMode && styles.toggleThumbOn]} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.row}>
                    <View style={styles.rowLeft}>
                        <FAIcon name="language" size={20} color={primaryColor} />
                        <Text style={styles.rowText}>Language</Text>
                    </View>
                    <FAIcon name="arrow-right" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            {/* SUPPORT */}
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.card}>
                <TouchableOpacity style={styles.row}>
                    <View style={styles.rowLeft}>
                        <FAIcon name="help" size={20} color={primaryColor} />
                        <Text style={styles.rowText}>Help Center</Text>
                    </View>
                    <FAIcon name="arrow-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('About')}>
                    <View style={styles.rowLeft}>
                        <FAIcon name="info" size={20} color={primaryColor} />
                        <Text style={styles.rowText}>About Ridezy</Text>
                    </View>
                    <FAIcon name="arrow-right" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            {/* LOGOUT */}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                <FAIcon name="logout" size={18} color="#c0392b" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 25,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        paddingTop: 20
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ddd',
        marginRight: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    profileEmail: {
        fontSize: 14,
        color: '#777',
        marginTop: 2,
    },
    sectionTitle: {
        color: '#999',
        fontSize: 13,
        marginBottom: 8,
        marginTop: 15,
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    rowText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#000',
        flexShrink: 1,
    },
    toggleBox: {
        width: 45,
        height: 26,
        borderRadius: 20,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    toggleOn: {
        backgroundColor: primaryColor,
    },
    toggleThumb: {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    toggleThumbOn: {
        alignSelf: 'flex-end',
    },
    logoutBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fdecea',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 40,
    },
    logoutText: {
        color: '#c0392b',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});
