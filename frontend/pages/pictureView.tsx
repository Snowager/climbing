import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import FlipCameraButton from '../components/flipCameraButton';
import React, { useEffect, useMemo, useState } from 'react';
import CameraBottomIconContainer from '../components/cameraBottomIconContainer';
import TakePictureButton from '../components/takePictureButton';
import * as MediaLibrary from 'expo-media-library';
import { useAlbum } from '../hooks/useAlbum';
import { RootStackParamList} from '../App';
import { LatestPhotoContainer } from '../components/latestPhotosContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CameraHandler } from '../components/cameraHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>

// View pane for the PictureView
// --TODO-- move logic downstream to handler component(s),
// Need to break up responsibility at some point
export default function PictureView({ route, navigation }: Props) {

    return (
        <CameraHandler navigation={navigation} />
    );
};