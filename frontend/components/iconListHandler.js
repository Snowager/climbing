import { useEffect, useState, useMemo } from "react"
import { Pressable, View } from "react-native"
import PanResponderCustom from "./panResponderCustom"

export default function IconListHandler() {
    const [iconList, setIconList] = useState([])
    const [coords, setCoords] = useState({xpos: null, ypos: null})

    useEffect(() => {
        if (coords.xpos !== null && coords.xpos !== null) setIconList([...iconList, {coords: coords, iconState: true}]);
        console.log(coords, iconList);
    }, [coords])

    useEffect(() => {
        iconList.filter((icon) => {icon.iconState === true})
    }, [iconList])


    const ui = useMemo(() => {
        return (
            <Pressable onPressIn={(e) => {
                if (Math.abs(e.nativeEvent.locationX - coords.xpos) > 10 || 
                    Math.abs(e.nativeEvent.locationY - coords.ypos) > 10) {
                        setCoords({xpos: e.nativeEvent.locationX, ypos: e.nativeEvent.locationY})
                    }
                }
                
            }>
                <View style={{height: "100%", width:"100%"}}>
                    {console.log(iconList)}
                    {iconList && iconList.map((icon, i) => {
                        return (
                            <PanResponderCustom key={i} setIconState={setIconList} id={icon} c={i} list={iconList} xpos={icon.coords.xpos} ypos={icon.coords.ypos}/>
                        )
                    })}
                </View>
            </Pressable>
        )
    }, [iconList])

    return (
        <>{ui}</>
    )
    
}