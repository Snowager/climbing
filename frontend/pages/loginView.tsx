
import React, { ReactElement } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../App';
import Login from '../components/login';

type NavigationProps = BottomTabNavigationProp<RootStackParamList, 'Login'>

type Props = {
    navigation: NavigationProps
}

// View pane for the mobileOverlayView --TODO-- create and add option shelves
export default function LoginView({route, navigation}): ReactElement<Props> {

    return (
        <><Login/></>
    )

    
}