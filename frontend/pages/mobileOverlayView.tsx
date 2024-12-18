import React, { ReactElement } from 'react';
import IconListHandler from '../components/iconListHandler';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../App';

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
        <><IconListHandler image={asset || null}/></>
    )

    
}