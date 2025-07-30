import { useNavigation } from "@react-navigation/native"
import { useEffect, useLayoutEffect, useState } from "react";
import BackIcon from "../../components/BackIcon";
import FAInput from "../../components/FAInput";
import { ActivityIndicator, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import FAButton from "../../components/FAButton";
import Toast from "react-native-toast-message";
import ApiInstance from "../../config/apis/ApiInstance";

export default function PostOffer() {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackIcon />
        })
    }, [navigation])

    const postNotification = async () => {
        if (!model.title || !model.message) {
            return Toast.show({ type: 'error', text2: 'Title & Message are required' })
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post('/userRoute/notification', model);
            Toast.show({ type: 'success', text2: 'Successfully Post Notification' })
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG)
        } finally {
            setLoading(false)
        }
    };


    return (
        <>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View>
                    <FAInput placeholder="Title" onChangeText={(e) => setModel({ ...model, title: e })} value={model.title || ''} />
                    <FAInput placeholder="Link (Optional)" onChangeText={(e) => setModel({ ...model, link: e })} value={model.link || ''} />
                    <FAInput placeholder="Message" multiline numberOfLines={4} onChangeText={(e) => setModel({ ...model, message: e })} value={model.message || ''} />
                    <FAButton label={loading ? <ActivityIndicator /> : <Text>Upload</Text>} disabled={loading} onPress={postNotification} />
                </View>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})