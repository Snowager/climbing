import { Pressable, StyleSheet, View, Dimensions } from "react-native";

export default function CameraButton() {

    return (
        <View style={styles.cameraButtonContainer}>
            <Pressable style={styles.cameraButton}></Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraButton: {
        borderRadius: Dimensions.get('window').width * .5,
        borderColor: "grey",
        borderWidth: 2,
        backgroundColor: "#444887",
        height: "100%",
        width: "100%",
    },
    cameraButtonContainer: {
        height: 80,
        width: 80,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 10,
        marginBottom: 20,
    }
})