import { useNavigation } from "@react-navigation/native";
import { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, ToastAndroid, View } from "react-native";
import FAInput from "../components/FAInput";
import FAButton from "../components/FAButton";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/apis/ApiInstance";

export default function ForgetPassword() {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    const resetPassword = async () => {
        if (!model.email || !model.newPassword) {
            return Toast.show({ type: 'error', text2: 'Validation error' })
        }
        if (model.password.length < 4) {
            return ToastAndroid.show('Password is to very short', ToastAndroid.LONG)
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post('/authRoute/resetPassword', model);
            Toast.show({ type: 'success', text2: 'Successfully Password Updated' })
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG)
        } finally {
            setModel({});
            setLoading(false)
        }
    }


    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>Forget Password</Text>
                <View style={styles.form}>
                    <FAInput placeholder="Email Address" onChangeText={(e) => setModel({ ...model, email: e })} value={model.email || ''} />
                    <FAInput placeholder="Password" secureTextEntry onChangeText={(e) => setModel({ ...model, password: e })} value={model.password || ''} />
                    <FAButton label={loading ? <ActivityIndicator color={'white'} size={24} /> : <Text style={{color:'white'}}>Forget Password</Text>} disabled={loading} onPress={resetPassword} />
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: '400',
        paddingBottom: 20,
        left: 17
    },
    form: {
        gap: 10
    }
})