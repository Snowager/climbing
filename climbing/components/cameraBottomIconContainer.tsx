import { View, StyleSheet } from "react-native"
import React from 'react'
import { AppProps } from "../types/appTypes"

export default function CameraBottomIconContainer({ children }: AppProps) {
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