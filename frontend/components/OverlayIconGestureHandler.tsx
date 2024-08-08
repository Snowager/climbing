import { ReactElement, SetStateAction, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Gesture, GestureDetector, PanGesture, PinchGesture, SimultaneousGesture, TapGesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Icon } from './iconListHandler';

export interface IconGestureProps {
    id: number,
    iconList: Icon[],
    setIconList: SetStateAction<Icon[]>,
    xpos, ypos: number,
    xoff, yoff: number,
}

// Gesture handler for the overlay icon system.
// Tapping: cycles through different icon images --TODO-- change temp images to custom assets
// Pinching: expands and contrasts icon that is touched
// Panning: Moves icon to new location on screen --TODO-- update icon coordinates within iconList because of position bug
export default function OverlayIconGestureHandler({id, iconList, setIconList, xpos = 0, ypos = 0, xoff = 100, yoff = 50}): ReactElement<IconGestureProps> {

    const position = useSharedValue<{x:number, y:number}>({x: 0, y: 0});

    const xTranslate = useSharedValue<number>(xpos-xoff);
    const yTranslate = useSharedValue<number>(ypos-(yoff*2));

    const startScale = useSharedValue<number>(1);
    const scale = useSharedValue<number>(1);

    const xrot = useSharedValue<number>(0);
    const yrot = useSharedValue<number>(0);

    const iconArr = [
        require('../assets/overlayMarkers/Button.jpg'), 
        require('../assets/overlayMarkers/hulk.jpg'),
        require('../assets/overlayMarkers/iron_man.jpg'),
        require('../assets/overlayMarkers/black_widow.jpg')
    ]

    const [toggle, setToggle] = useState(false)
    
    const [iconIndex, setIconIndex] = useState(0);

    function clamp(val: number, min: number, max: number): number {
        return Math.min(Math.max(val, min), max)
    }
  
    const panGesture: PanGesture = Gesture.Pan()
        .onStart((e) => {
            position.value.x = xTranslate.value;
            position.value.y = yTranslate.value;
        })
        .onUpdate((e) => {
            xTranslate.value = e.translationX + position.value.x;
            yTranslate.value = e.translationY + position.value.y;
            console.log("panning")
        }).runOnJS(true);

    const pinchGesture: PinchGesture = Gesture.Pinch()
        .onStart((e) => {
            startScale.value = scale.value;
        })
        .onUpdate((e) => {
            scale.value = clamp(startScale.value * e.scale, 0.2, 2); 
    }).runOnJS(true)

    const tapGesture: TapGesture = Gesture.Tap().maxDuration(100)
        .onStart((e) => {
            console.log("here")
            setToggle(value => !value);
        }).runOnJS(true)

    // Ensures that gestures can occur simultaneously and not exclude when interrupting
    const composeGesture: SimultaneousGesture = Gesture.Simultaneous(pinchGesture, panGesture, tapGesture)

    // uses a toggle as indicator to change the iconIndex and filters based on index and id matching for 
    // iconList
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
  const styles = (xoff: number, yoff: number) => StyleSheet.create({
    box: {
    position: 'absolute',
    height: xoff,
    width: yoff*2,
    zIndex:12,
    },
  });