import React, { useEffect, useState, useMemo, ReactElement } from "react"
import { View, Animated, Image} from "react-native"
import OverlayIconGestureHandler from "./OverlayIconGestureHandler";
import { GestureHandlerRootView, Gesture, GestureDetector, TapGesture } from "react-native-gesture-handler"
import * as MediaLibrary from 'expo-media-library';
import uuid from 'react-native-uuid'


// interface for icon position coords
export interface Coord {
    xpos: number,
    ypos: number
}

// interface for an icon object
export interface Icon {
    id: string,
    coords: Coord
    iconIndex: number
}

// interface for icon list props
export interface IconListHandlerProps {
    image: MediaLibrary.Asset | null
}

export default function IconListHandler({image}): ReactElement {
    const [iconList, setIconList] = useState<Icon[]>([])
    const [coords, setCoords] = useState<Coord>({xpos: null, ypos: null})
    const xoff: number = 100
    const yoff: number = 50
    
    // Controls tapping on the screen for generating an icon
    const tapGesture: TapGesture = Gesture.Tap()
        .onStart((e) => {
            let makeIcon = true
            // Generates an icon for first tap moving to screen
            if (iconList.length <= 0) {
                setCoords({xpos: e.absoluteX, ypos: e.absoluteY})
            }
            // ensures another icon can't be produced when tapping on a location within 
            //specified amount from the icons coordinates
            for (const icon of iconList) {
                //console.log(icon.id);
                //console.log(Math.abs(e.absoluteX - icon.coords.xpos), Math.abs(e.absoluteY - icon.coords.ypos))
                if (Math.abs(e.absoluteX - icon.coords.xpos) < 50 && 
                    Math.abs(e.absoluteY - icon.coords.ypos) < 50) {
                    makeIcon = false
                    
            }}
            if (makeIcon) {
                setCoords({xpos: e.absoluteX, ypos: e.absoluteY})
            }
            })
            .runOnJS(true); // needs to run on JS thread for React states

    // useEffect to update iconList with new icon when new coords logged --TODO-- add support for tracking moved icon positions
    useEffect(() => {
        if (coords.xpos !== null && coords.ypos !== null) {
            setIconList([...iconList, {id: uuid.v4(), coords: coords, iconIndex: 0}]);
        }
    }, [coords.xpos, coords.ypos])

    useEffect(() => {
        //console.log("iconListHandlerLog: "+JSON.stringify(iconList))
        setCoords({xpos: null, ypos: null})
    }, [JSON.stringify(iconList)])

    function removeIndex(index?: number): void {
        let newList = [...iconList];
        newList.splice(index, 1);
        setIconList(newList);
    }

    function changeCoords(xpos?: number, ypos?: number, id?: number): void {
        for (let index of iconList.keys()) {
            //console.log(index, id)
            if (index === id) {
                //console.log("change coords")
                setCoords({xpos: null, ypos: null})
                //console.log(xpos, ypos)
                iconList[index].coords = {xpos:xpos, ypos:ypos};
            }
        }
    }


    // Gesture detector works on the animated view below
    // Detects initial tap for generating icons
    const ui = useMemo(() => {
        return (
                <View>
                <GestureDetector gesture={tapGesture}>
                <Animated.View style={{height:"100%", width:"100%"}}>
                    {!!image && <Image source={{uri: image.uri}} style={{height: "100%", width:"100%", resizeMode:'stretch'}}/>}
                    {iconList && iconList.map((icon, i) => {
                        return (
                            <OverlayIconGestureHandler 
                                key={icon.id} 
                                id={i}
                                remove={removeIndex}
                                changeCoords={changeCoords}
                                iconIndex = {icon.iconIndex}
                                xpos={icon.coords.xpos} 
                                ypos={icon.coords.ypos} 
                                xoff={xoff} 
                                yoff={yoff} 
                            />
                        )
                    })}
                </Animated.View>
                </GestureDetector>
                </View>
        )
    }, [JSON.stringify(iconList), image])

    return (
        <>{ui}</>
    )
    
}