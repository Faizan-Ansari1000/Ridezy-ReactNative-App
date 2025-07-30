import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import FAIcon from "./FAIcon"

export default function BackIcon() {

    const navigation = useNavigation()
    return (
        <>
            <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.goBack()}>
                <FAIcon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
        </>
    )
}