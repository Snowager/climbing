import { View, StyleSheet } from "react-native"

export default function CameraBottomIconContainer({ props, children = null }) {
    return (
        <View style={styles.cameraBottomIconContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    cameraBottomIconContainer: {
        flexDirection: "row",
        width: 200,
        height: 120,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-evenly",
        zIndex: 2,
        marginBottom: 10,
    }
})