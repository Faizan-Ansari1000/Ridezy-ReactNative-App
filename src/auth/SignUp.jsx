import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import FAInput from "../components/FAInput";
import FAButton from "../components/FAButton";
import Toast from "react-native-toast-message";
import FAIcon from "../components/FAIcon";
// import Icon from "react-native-vector-icons/MaterialIcons";
import ApiInstance from "../config/apis/ApiInstance";

export default function SignUp() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const [isAgree, setIsAgree] = useState(false);
    const [selectedRole, setSelectedRole] = useState('user'); // Default to 'user'

    const navigation = useNavigation();

    const signUpAccount = async () => {
        if (!model.name || !model.email || !model.password) {
            return Toast.show({ type: 'error', text2: 'All fields are required' });
        }
        if (!isAgree) {
            return ToastAndroid.show('Please check the agreement box', ToastAndroid.LONG);
        }
        if (!model.email.includes('@')) {
            return ToastAndroid.show('Invalid email', ToastAndroid.LONG);
        }
        if (model.password.length < 4) {
            return ToastAndroid.show('Password too short', ToastAndroid.LONG);
        }

        try {
            setLoading(true);

            const res = await ApiInstance.post('/authRoute/signUp', {
                name: model.name,
                email: model.email,
                password: model.password,
                role: selectedRole || 'user',
            });

            console.log("Registered as =>", res.data.role);

            Toast.show({ type: 'success', text2: 'Account successfully registered' });

            navigation.navigate('Account');

        } catch (error) {
            console.log("Signup Error =>", error);
            Toast.show({ type: 'error', text2: error.response?.data?.message || 'Signup failed' });
        } finally {
            setLoading(false);
            setModel({});
        }
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.heading}>Sign Up</Text>

                <View style={styles.form}>
                    <FAInput
                        placeholder="Name"
                        onChangeText={(e) => setModel({ ...model, name: e })}
                        value={model.name || ""}
                    />
                    <FAInput
                        placeholder="Email Address"
                        onChangeText={(e) => setModel({ ...model, email: e })}
                        value={model.email || ""}
                    />
                    <FAInput
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(e) => setModel({ ...model, password: e })}
                        value={model.password || ""}
                    />

                    <View style={styles.roleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.roleButton,
                                selectedRole === 'user' && styles.selectedRole,
                            ]}
                            onPress={() => setSelectedRole('user')}
                        >
                            <Text style={[
                                styles.roleText,
                                selectedRole === 'user' && styles.selectedText
                            ]}>User</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.roleButton,
                                selectedRole === 'driver' && styles.selectedRole,
                            ]}
                            onPress={() => setSelectedRole('driver')}
                        >
                            <Text style={[
                                styles.roleText,
                                selectedRole === 'driver' && styles.selectedText
                            ]}>Driver</Text>
                        </TouchableOpacity>
                    </View>

                    {/* ✅ Agreement */}
                    <View style={styles.agreement}>
                        <TouchableOpacity onPress={() => setIsAgree(!isAgree)}>
                            <FAIcon
                                name={isAgree ? "check-box" : "check-box-outline-blank"}
                                size={24}
                                color="#641e16"
                            />
                        </TouchableOpacity>

                        <Text style={styles.agreeText}>
                            By signing up, you agree to the Terms of Service and{"\n"}Privacy Policy.
                        </Text>
                    </View>

                    {/* ✅ Submit Button */}
                    <FAButton
                        onPress={signUpAccount}
                        disabled={loading}
                        label={
                            loading ? (
                                <ActivityIndicator color="white" size={20} />
                            ) : (
                                <Text style={{ color: "white" }}>Sign Up</Text>
                            )
                        }
                    />
                </View>

                <Text style={styles.bottomText}>
                    Already have an account?{" "}
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "400",
        color: "black",
        marginBottom: 20,
        marginLeft: 15
    },
    form: {
        gap: 15,
        flex: 1,
        justifyContent: 'center'
    },
    agreement: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 15
    },
    agreeText: {
        fontSize: 14,
        color: "#555",
        flex: 1,
        marginLeft: 10
    },
    bottomText: {
        marginTop: 30,
        textAlign: "center",
        color: "#555",
    },
    loginLink: {
        color: "#641e16",
        fontWeight: "bold",
    },
    // 🟢 Role styling
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    roleButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#641e16',
        borderRadius: 15,
    },
    selectedRole: {
        backgroundColor: '#641e16',
    },
    roleText: {
        color: '#641e16',
        fontWeight: '500',
    },
    selectedText: {
        color: 'white',
    },
});
