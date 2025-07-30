import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function SkipBtn(props) {

    const { onPress, label } = props;

    return (
        <>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.backBtn}>{label}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    backContainer: {
        alignSelf: 'flex-end',
        paddingVertical: 25,
        paddingHorizontal: 25,
        marginTop: 25
    },
    backBtn: {
        fontWeight: '300',
        fontSize: 24
    },
}) 