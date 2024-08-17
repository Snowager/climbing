import { useEffect, useState, useMemo, useRef, ReactElement } from "react"
import { View, Animated, Image} from "react-native"
import OverlayIconGestureHandler from "./overlayIconGestureHandler"
import { GestureHandlerRootView, Gesture, GestureDetector, TapGesture } from "react-native-gesture-handler"


// interface for icon position coords
export interface Coord {
    xpos: number,
    ypos: number
}

// interface for an icon object
export interface Icon {
    coords: Coord
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
                if (Math.abs(e.absoluteX - icon.coords.xpos) < 100 && 
                    Math.abs(e.absoluteY - icon.coords.ypos) < 100) {
                    makeIcon = false
                    
            }}
            if (makeIcon) {
                setCoords({xpos: e.absoluteX, ypos: e.absoluteY})
            }
            })
            .runOnJS(true); // needs to run on JS thread for React states

    useEffect(() => {
        if (coords.xpos !== null && coords.xpos !== null) setIconList([...iconList, {coords: coords}]);
    }, [coords])


    // Gesture detector works on the animated view below
    // Detects initial tap for generating icons
    const ui = useMemo(() => {
        return (
                <View>
                <GestureHandlerRootView style={{height: '100%', width: '100%'}}>
                <GestureDetector gesture={tapGesture}>
                <Animated.View style={{height:600, width:400}}>
                    {image && <Image source={{uri: image}} style={{height:600, width:400} }/>}
                    {/* {console.log(iconList)} */}
                    {iconList && iconList.map((icon, i) => {
                        return (
                                <OverlayIconGestureHandler 
                                key={i} 
                                id={i}
                                iconList = {iconList}
                                setIconList = {setIconList}
                                xpos={icon.coords.xpos} 
                                ypos={icon.coords.ypos} 
                                xoff={xoff} 
                                yoff={yoff} 
                                />
                        )
                    })}
                </Animated.View>
                </GestureDetector>
                </GestureHandlerRootView>
                </View>
        )
    }, [iconList])

    return (
        <>{ui}</>
    )
    
}