import React, { ReactElement, SetStateAction, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Gesture, GestureDetector, PanGesture, PinchGesture, SimultaneousGesture, TapGesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export interface IconGestureProps {
    id: number,
    remove: (index: number) => void,
    changeCoords: (xpos: number, ypos: number, id: number) => void
    iconIndex: number,
    xpos, ypos: number,
    xoff, yoff: number,
}

// Gesture handler for the overlay icon system.
// Tapping: cycles through different icon images --TODO-- change temp images to custom assets
// Pinching: expands and contrasts icon that is touched
// Panning: Moves icon to new location on screen
export default function OverlayIconGestureHandler({id, remove, changeCoords, iconIndex = 0, xpos = 0, ypos = 0, xoff = 100, yoff = 50}): ReactElement<IconGestureProps> {


    const position = useSharedValue<{x:number, y:number}>({x: 0, y: 0});

    const xTranslate = useSharedValue<number>(xpos-(xoff/2));
    const yTranslate = useSharedValue<number>(ypos-(yoff*2));

    const startScale = useSharedValue<number>(1);
    const scale = useSharedValue<number>(1);

    const [index, setIndex] = useState(iconIndex);

    const xrot = useSharedValue<number>(0);
    const yrot = useSharedValue<number>(0);

    const iconArr = [
        require('../assets/overlayMarkers/Button.jpg'), 
        require('../assets/overlayMarkers/hulk.jpg'),
        require('../assets/overlayMarkers/iron_man.jpg'),
        require('../assets/overlayMarkers/black_widow.jpg')
    ]

    function clamp(val: number, min: number, max: number): number {
        return Math.min(Math.max(val, min), max)
    }
  
    const panGesture: PanGesture = Gesture.Pan()
        .onStart(() => {
            position.value.x = xTranslate.value;
            position.value.y = yTranslate.value;
        })
        .onUpdate((e) => {
            xTranslate.value = e.translationX + position.value.x;
            yTranslate.value = e.translationY + position.value.y;
        }).onFinalize((e) => {
            
            // on finalize of pan, changes the coords of this icon within parent component
            changeCoords(e.absoluteX, e.absoluteY, id);
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
            setIndex((val) => val + 1);
        }).runOnJS(true)

    // Ensures that gestures can occur simultaneously and not exclude when interrupting
    const composeGesture: SimultaneousGesture = Gesture.Simultaneous(pinchGesture, panGesture, tapGesture)


    // compares iconArray length to remove from iconList in parent component
    useEffect(() => {
        if (index >= iconArr.length) {
            //console.log("removal")
            remove(id);
        } 
    }, [index])

    // useEffect(() => {
    //     console.log("mounted id: "+id)
    //     return () => {
    //         console.log("unmounted id: "+id)
    //     }
    // }, [])

  
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
                  <Image source={iconArr[index]} style={styles(xoff, yoff).box} />
              </Animated.View>
            </GestureDetector>
          );
    }, [index])
  
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