import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { overlayStyle } from '../styles/overlayStyle';


export default function overlayView({navigation}) {

    const [mousePos, setMousePos] = useState({
        xpos: null,
        ypos: null,
    })

    const [overlayFollowToggle, setOverlayFollowToggle] = useState(false)

    useEffect(() => {
        window.addEventListener('mousemove', (ev) => {
            setMousePos({xpos: ev.clientX, ypos: ev.clientY})
            //console.log(mousePos)
        })

        window.addEventListener('click', () => {
            setOverlayFollowToggle(value => !value)
            console.log(overlayFollowToggle)
        })

    }, [])

    return (
        <View>
        <View style={overlayStyle(overlayFollowToggle, mousePos.xpos, mousePos.ypos).overlay}>Stuff</View>
        <Text>{JSON.stringify(mousePos)}</Text>
        </View>
    )
}