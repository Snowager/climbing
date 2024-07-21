import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { overlayStyle } from '../styles/overlayStyle';


export default function MobileOverlayView({navigation}) {

    const [mousePos, setMousePos] = useState({
        xpos: null,
        ypos: null,
    })

    const [overlayFollowToggle, setOverlayFollowToggle] = useState(false)

    return (
        <View>
            <TouchableOpacity style={{
                elevation: (Platform.OS === 'android') ? 50 : 0,
                zIndex: 5,
            }}
            onPress={(ev) => {
                setOverlayFollowToggle(true);

                setMousePos({xpos: ev.nativeEvent.locationX, ypos: ev.nativeEvent.locationY
                });
            }}>
                <View style={
                    {
                        width: 200,
                        height: 300,
                    }
                }>
                    <Text>Stuff</Text>
                    <Text>{JSON.stringify(mousePos)}</Text>
                </View>
            </TouchableOpacity>
            <View style={overlayStyle(overlayFollowToggle, mousePos.xpos, mousePos.ypos).overlay}></View>
        </View>

    )
}