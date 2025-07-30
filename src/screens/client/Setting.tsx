import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react";
import { View } from "react-native";
import FAIcon from "../../components/FAIcon";

export default function Setting() {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ paddingLeft: 10 }}>
                    <FAIcon name="arrow-back" size={24} />
                </View>
            ),
            headerRight: () => {
                return <View style={{ paddingRight: 10 }}>
                    <FAIcon name="settings" size={24} />
                </View>
            }
        })
    }, [navigation])

    return (
        <>

        </>
    )
}