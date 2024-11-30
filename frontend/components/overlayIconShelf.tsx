import React, { PropsWithChildren, ReactElement, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

// Dropdown shelf to hold icons for UI overlay -- TODO -- add icon support using horizontal list
export default function OverlayIconShelf({children}): ReactElement<PropsWithChildren> {

    const position = useSharedValue<number>(0);
    const [open, setOpen] = useState(false);

    const upfling = Gesture.Fling().direction(Directions.UP).onStart((e) => {
        console.log("fling")
        setOpen(false);
        position.value = withTiming(position.value-200, {
            duration: 300,
            easing: Easing.elastic(1.1),
        })
    }).enabled(open).runOnJS(true)

    const downfling = Gesture.Fling().direction(Directions.DOWN).onStart((e) => {
        console.log("fling")
        setOpen(true);
        position.value = withTiming(position.value+200, {
            duration: 300,
            easing: Easing.inOut(Easing.quad),
        })
    }).enabled(!open).runOnJS(true)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
        transformOrigin: 'top'
    }))

    const compose = Gesture.Exclusive(upfling, downfling)
    
    return (
        <View style={{width:"100%", height:"100%"}}>
            {children}
                <GestureDetector gesture={compose}>
                <Animated.View style={[animatedStyle, styles.shelf]}>
                    <View style={{width:"100%", height:"100%", display:'flex', justifyContent:'flex-end', alignItems:'center'}}><Text style={{fontSize:40}}>Open Me</Text></View>
                </Animated.View>
                </GestureDetector>
        </View>
    )
}

    const styles = StyleSheet.create({
        shelf: {
            height: 300, 
            width:  "100%", 
            backgroundColor: 'yellow', 
            transformOrigin: 'left',
            elevation: 30,
            position: 'absolute',
            bottom: 570,
        },
        shelfContainer: {
            height: 100, 
            width: "100%", 
            backgroundColor: 'blue', 
            transformOrigin: 'left',
            position: 'absolute',
            bottom: 570,
        }
    })
