import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    ToastAndroid,
} from "react-native";
import FAInput from "../components/FAInput";
import FAButton from "../components/FAButton";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    // const loginAccount = async () => {
    //     if (!model.email || !model.password) {
    //         return Toast.show({ type: 'error', text2: 'Email & Password are required' });
    //     }

    //     try {
    //         setLoading(true);
    //         const res = await ApiInstance.post('/authRoute/login', model);
    //         // const { role, message, data } = res.data;
    //         const { role } = res.data;
    //         console.log(role);

    //         Toast.show({ type: 'success', text2: `${role} Successfully LoggedIn` });

    //         // if (role?._id) {
    //         //     await AsyncStorage.setItem('userId', role._id);
    //         // }

    //         if (role === 'user') {
    //             navigation.navigate('Home');
    //         }
    //         if (role === 'driver') {
    //             navigation.navigate('RequestRides');
    //         }
    //         if (role === 'admin') {
    //             navigation.navigate('Admin')
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         console.log(error.message);
    //         ToastAndroid.show(error.response?.data?.message || 'Login failed', ToastAndroid.LONG);
    //     } finally {
    //         setLoading(false);
    //         setModel({});
    //     }
    // };


    const loginAccount = async () => {
        if (!model.email || !model.password) {
            return Toast.show({ type: 'error', text2: 'Email & Password are required' });
        }

        try {
            setLoading(true);
            const res = await ApiInstance.post('/authRoute/login', model);
            console.log(res.data);
            const { role, data } = res.data;

            console.log("Logged in role =>", role);
            console.log("Logged in userId =>", data._id);

            Toast.show({ type: 'success', text2: `${role} Successfully LoggedIn` });

            if (data?._id) {
                await AsyncStorage.setItem('userId', data._id);
            }

            if (role === 'user') {
                navigation.navigate('Home');
            } else if (role === 'driver') {
                navigation.navigate('RequestRides');
            } else if (role === 'admin') {
                navigation.navigate('Admin');
            }
        } catch (error) {
            console.error(error);
            ToastAndroid.show(error.response?.data?.message || 'Login failed', ToastAndroid.LONG);
        } finally {
            setLoading(false);
            setModel({});
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign In</Text>

            <View style={styles.form}>
                <FAInput
                    placeholder="Email Address"
                    onChangeText={(text) => setModel({ ...model, email: text })}
                    value={model.email || ""}
                />
                <FAInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(text) => setModel({ ...model, password: text })}
                    value={model.password || ""}
                />

                <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <FAButton
                    onPress={loginAccount}
                    label={
                        loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={{ color: "white" }}>Sign In</Text>
                        )
                    }
                    disabled={loading}
                />
            </View>

            <Text style={styles.bottomText}>
                Don’t have an account?{" "}
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
    },
    heading: {
        fontSize: 24,
        fontWeight: "400",
        color: "black",
        paddingLeft: 16,
        marginBottom: 20,
    },
    form: {
        gap: 15,
    },
    forgotText: {
        textAlign: "right",
        paddingRight: 18,
        color: "red",
        fontSize: 14,
    },
    bottomText: {
        // marginTop: 30,
        textAlign: "center",
        color: "#555",
    },
    linkText: {
        color: "#641e16",
        fontWeight: "bold",
    },
});
