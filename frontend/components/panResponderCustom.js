import { Animated, PanResponder, View, Pressable , Image} from 'react-native'
import { overlayStyle } from '../styles/overlayStyle';
import { useRef, useState } from 'react';

export default function PanResponderCustom() {
    const pan = useRef(new Animated.ValueXY()).current;
    const longPress = useRef(false)
    const timeLongPress = useRef(null)

    const panResponder = useRef(
        PanResponder.create({
        onPanResponderGrant: () => {
            timeLongPress.current = setTimeout(() => {
                longPress.current = true
            }, 50);
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

    const colorArr = [
        require('../assets/overlayMarkers/Button.jpg'), 
        require('../assets/overlayMarkers/hulk.jpg'),
        require('../assets/overlayMarkers/iron_man.jpg'),
        require('../assets/overlayMarkers/black_widow.jpg')
    ]
    
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
                    <View style={overlayStyle(overlayFollowToggle, ).overlay}><Image source={colorArr[colorIndex]} style={{width:100, height:100}}></Image></View>
                </Pressable>
            </Animated.View>
        </>
    )
}