import { ReactElement } from "react";
import { Pressable, StyleSheet, View, Dimensions } from "react-native";

type Props = {
    onPress: Function
}

export default function CameraButton({ onPress }): ReactElement<Props> {
    return (
        <View style={styles.cameraButtonContainer}>
            <Pressable style={styles.cameraButton} onPress={onPress}></Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraButton: {
        borderRadius: Dimensions.get('window').width * .5,
        borderColor: "grey",
        borderWidth: 2,
        backgroundColor: "#E5CB3D",
        height: "100%",
        width: "100%",
        zIndex: 3,
    },
    cameraButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3,
        marginBottom: 20,
    }
})