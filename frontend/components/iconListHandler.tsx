import { useEffect, useState, useMemo, useRef, ReactElement } from "react"
import { View, Animated } from "react-native"
import PanResponderCustom from "./panResponderCustom"
import { GestureHandlerRootView, Gesture, GestureDetector, TapGesture } from "react-native-gesture-handler"

export interface Coord {
    xpos: number,
    ypos: number
}

export interface Icon {
    coords: Coord
}

export default function IconListHandler(): ReactElement {
    const [iconList, setIconList] = useState<Icon[]>([])
    const [coords, setCoords] = useState<Coord>({xpos: null, ypos: null})
    const xoff: number = 100
    const yoff: number = 50

    const tapGesture: TapGesture = Gesture.Tap()
        .onStart((e) => {
            let makeIcon = true
            // console.log("tapp")
            // console.log(gestureList)
            // console.log(makeIcon)
            if (iconList.length <= 0) {
                setCoords({xpos: e.absoluteX, ypos: e.absoluteY})
            }
            for (const icon of iconList) {
                // console.log(`e ${e.absoluteX} e ${e.absoluteY}`)
                // console.log(Math.abs(e.absoluteX - icon.coords.xpos), Math.abs(e.absoluteY - icon.coords.ypos))
                if (Math.abs(e.absoluteX - icon.coords.xpos) < 100 && 
                    Math.abs(e.absoluteY - icon.coords.ypos) < 100) {
                    makeIcon = false
                    
            }}
            if (makeIcon) {
                setCoords({xpos: e.absoluteX, ypos: e.absoluteY})
            }
            })
            .runOnJS(true);

    useEffect(() => {
        if (coords.xpos !== null && coords.xpos !== null) setIconList([...iconList, {coords: coords}]);
    }, [coords])


    const ui = useMemo(() => {
        return (
                <View>
                <GestureHandlerRootView style={{height: '100%', width: '100%'}}>
                <GestureDetector gesture={tapGesture}>
                <Animated.View style={{height:600, width:400, backgroundColor:'yellow'}}>
                    {/* {console.log(iconList)} */}
                    {iconList && iconList.map((icon, i) => {
                        return (
                                <PanResponderCustom 
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