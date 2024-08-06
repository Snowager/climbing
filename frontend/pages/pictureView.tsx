import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import CameraButton from '../components/cameraButton';
import React, { useEffect, useMemo, useState } from 'react';
import CameraBottomIconContainer from '../components/cameraBottomIconContainer';
import PictureButton from '../components/pictureButton';
import * as MediaLibrary from 'expo-media-library';
import { useAlbum } from '../hooks/useAlbum';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../App';

type NavigationProps = BottomTabNavigationProp<RootStackParamList, 'Camera'>

type Props = {
    navigation: NavigationProps
}

export default function PictureView({ navigation }: Props) {
    const [cameraLoad, setCameraLoad] = useState(false);
    const [camera, setCamera] = useState(null);
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [staticPermission, setStaticPermission] = useState(false);
    const [albumName, setAlbumName] = useState("Hair");


    const album = useAlbum(albumName);

    async function permissionFunction(): Promise<any> {
        const permission = await Camera.requestCameraPermissionsAsync();
        if (permission.granted) {
            setStaticPermission(true);
        }
    }

    useEffect(() => {
        permissionFunction();
    }, [])

    useEffect(() => {
        // console.log(album)
    }, [album])

    useEffect(() => {
        navigation.addListener('focus', () => {
            setCameraLoad(true)
        })
    }, [])

    useEffect(() => {
        navigation.addListener('blur', () => {
            setCameraLoad(false)
        })
    }, [])

    function flipCamera() {
        setCameraType(cameraType == CameraType.back ? CameraType.front : CameraType.back)
    }

    async function takePicture(): Promise<void> {
        if (!camera) {
            return
        }
        const photo = await camera.takePictureAsync();
        if (permissionResponse) {
            await MediaLibrary.saveToLibraryAsync(photo.uri);
        }
    }


    const gui = useMemo(() => {
        return (
            !staticPermission ?
                // Camera permissions are still loading
                <View>
                    <Text>Nothing</Text>
                </View>
                :
                <View style={styles.mainPane}>
                    {cameraLoad &&
                        <Camera style={styles.camera} type={cameraType} ratio={'4:3'} ref={(ref) => setCamera(ref)}>
                            <CameraBottomIconContainer>
                                <PictureButton onPress={takePicture} />
                                <CameraButton onPress={flipCamera} />
                            </CameraBottomIconContainer>
                        </Camera>}
                </View>
        )
    }, [camera, cameraType, staticPermission, cameraLoad]
    )

    return (
        gui
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainPane: {
        flex: 1,
        width: "100%",
    },
    camera: {
        height: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});