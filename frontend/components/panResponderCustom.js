import {PanGestureHandler, GestureHandlerRootView} from 'react-native-gesture-handler'
import { Animated, PanResponder, View, TouchableOpacity, Text, Pressable } from 'react-native'
import { overlayStyle } from '../styles/overlayStyle';
import { useRef, useState, useEffect } from 'react';

export default function PanResponderCustom() {
    const pan = useRef(new Animated.ValueXY()).current;
    const longPress = useRef(false)
    const timeLongPress = useRef(null)

    const panResponder = useRef(
        PanResponder.create({
        onPanResponderGrant: () => {
            timeLongPress.current = setTimeout(() => {
                longPress.current = true
            }, 250);
        },
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false})(e, gestureState);
        },
        onPanResponderRelease: () => {
            console.log(longPress.current)
            if (longPress.current === false) {
                setOverlayFollowToggle(true);
                setColorindex(value => {
                value++;
                value = value % colorArr.length;
                return value;
                });
            }
            longPress.current = false
            if (timeLongPress.current) {
                clearTimeout(timeLongPress.current);
                timeLongPress.current = null 
            }
            console.log(colorIndex);
            pan.extractOffset();
        },
        }),
    ).current;

    panResponder.onPanResponderGrant = () => {
        
    }

    const [overlayFollowToggle, setOverlayFollowToggle] = useState(false)

    const colorArr = ['blue', 'red', 'green', 'yellow']
    
    const [colorIndex, setColorindex] = useState(0);

    const [mousePos, setMousePos] = useState({
        xpos: null,
        ypos: null,
    })

    const [prevMousePos, setPrevMousePos] = useState({
        xpos: null,
        ypos: null,
    })

        

    return (
        <>
            <Animated.View style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }} {...panResponder.panHandlers}>
                <Pressable
                    onLongPress={() => {
                        console.log("hit")
                    }}>
                    <View style={overlayStyle(overlayFollowToggle, colorArr[colorIndex]).overlay}></View>
                </Pressable>
            </Animated.View>
        </>
    )
}