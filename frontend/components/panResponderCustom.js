import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';


export default function PanResponderCustom({id, iconList, setIconList, xpos, ypos, xoff, yoff}) {

    const position = useSharedValue({x: 0, y: 0});

    const xTranslate = useSharedValue(xpos-xoff);
    const yTranslate = useSharedValue(ypos-(yoff*2));

    const startScale = useSharedValue(1);
    const scale = useSharedValue(1);

    const xrot = useSharedValue(0);
    const yrot = useSharedValue(0);

    const iconArr = [
        require('../assets/overlayMarkers/Button.jpg'), 
        require('../assets/overlayMarkers/hulk.jpg'),
        require('../assets/overlayMarkers/iron_man.jpg'),
        require('../assets/overlayMarkers/black_widow.jpg')
    ]

    const [toggle, setToggle] = useState(false)
    
    const [iconIndex, setIconIndex] = useState(0);

    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }
  
    const panGesture = Gesture.Pan()
        .onStart((e) => {
            position.value.x = xTranslate.value;
            position.value.y = yTranslate.value;
        })
        .onUpdate((e) => {
            xTranslate.value = e.translationX + position.value.x;
            yTranslate.value = e.translationY + position.value.y;
            console.log("panning")
        }).runOnJS(true);

    const pinchGesture = Gesture.Pinch()
        .onStart((e) => {
            startScale.value = scale.value;
        })
        .onUpdate((e) => {
            scale.value = clamp(startScale.value * e.scale, 0.2, 2); 
    }).runOnJS(true)

    const tapGesture = Gesture.Tap().maxDuration(100)
        .onStart((e) => {
            console.log("here")
            setToggle(value => !value);
        }).runOnJS(true)

    const composeGesture = Gesture.Simultaneous(pinchGesture, panGesture, tapGesture)

    useEffect(() => {
        setIconIndex(value => {
            value++;
            return value;
            });
        if (iconIndex >= iconArr.length) {
            let list = iconList.filter((val, index) => {index !== id})
            setIconList(list);
        }
    }, [toggle])

  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: xTranslate.value }, { translateY: yTranslate.value }, { scale: scale.value }],
      height: xoff,
      width: yoff*2,
      position: 'absolute'
    }));

    const ui = useMemo(() => {
        return (
            <GestureDetector gesture={composeGesture}>
              <Animated.View style={[animatedStyle]}>
                  <Image source={iconArr[iconIndex]} style={styles(xoff, yoff).box} />
              </Animated.View>
            </GestureDetector>
          );
    }, [iconIndex])
  
    return (
        <>
            {ui}
        </>
    )
    
  }
  const styles = (xoff, yoff) => StyleSheet.create({
    box: {
    position: 'absolute',
    height: xoff,
    width: yoff*2,
    zIndex:12,
    },
  });