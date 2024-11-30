import React, { ReactElement } from 'react';
import { View } from 'react-native';
import IconListHandler from '../components/iconListHandler';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../App';
import OverlayIconShelf from '../components/overlayIconShelf';

type NavigationProps = BottomTabNavigationProp<RootStackParamList, 'Overlay'>

type Props = {
    navigation: NavigationProps
}

// View pane for the mobileOverlayView --TODO-- create and add option shelves
export default function MobileOverlayView({route, navigation}): ReactElement<Props> {
    let asset;
    if (route.params) {
        const {imageAsset} = route.params;
        asset = imageAsset;
    }

    return (
        <>
        <View style={{width:"100%", height:"100%"}}>
                <OverlayIconShelf>
                    <IconListHandler image={asset || null}/>
                </OverlayIconShelf>
        </View>
        </>
    )

    
}