import { View, StyleSheet, Button } from "react-native";
import React, { useState } from "react";

export default function ErrorPopup({setOpen, children}) {

    return (
        <View style={styles.popup}>
            <Button title="Close" onPress={setOpen}></Button>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    popup: {
        width: '60%',
        height: 'auto',
        padding: 10,
        borderRadius: 25,
        bottom: -100,
        backgroundColor: 'purple',
        shadowOffset: {width: 2, height: 3},
        elevation: 3,
        position: 'absolute',
    }
})
