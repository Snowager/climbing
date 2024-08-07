
import React, { ReactElement } from 'react';
import IconListHandler from '../components/iconListHandler';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../App';

type NavigationProps = BottomTabNavigationProp<RootStackParamList, 'Overlay'>

type Props = {
    navigation: NavigationProps
}


export default function MobileOverlayView({navigation}): ReactElement<Props> {

    return (
        <><IconListHandler/></>
    )

    
}