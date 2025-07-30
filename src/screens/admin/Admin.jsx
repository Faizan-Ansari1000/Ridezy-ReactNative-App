import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import BackIcon from "../../components/BackIcon";
import FAIcon from "../../components/FAIcon";
import { StatusBar, TouchableOpacity, View } from "react-native";
import SideModal from "../../components/SideModal";

export default function Admin() {

    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackIcon />,
            headerRight: () => {
                return (
                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => setIsOpen(true)}>
                        <FAIcon name="menu" size={24} />
                    </TouchableOpacity>
                )
            }
        })
    }, [navigation])

    useEffect(() => {
        if (isOpen) {
            return StatusBar.setBackgroundColor('#e5e7e9')
        } else {
            return StatusBar.setBackgroundColor('transparent')
        }
    }, [isOpen])

    return (
        <>
            <SideModal
                visible={isOpen}
                transparent={true}
                onRequestClose={() => setIsOpen(false)}
                label="Profile"
                onPress={() => setIsOpen(false)}
            />
        </>
    );
}