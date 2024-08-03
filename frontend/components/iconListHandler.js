import { useEffect, useState, useMemo, useRef } from "react"
import { View, Animated } from "react-native"
import PanResponderCustom from "./panResponderCustom"
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler"

export default function IconListHandler() {
    const [iconList, setIconList] = useState([])
    const [coords, setCoords] = useState({xpos: null, ypos: null})
    const xoff = 100
    const yoff = 50

    const tapGesture = Gesture.Tap()
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
                <GestureHandlerRootView style={{height: 'fit-content', width: 'fit-content'}}>
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