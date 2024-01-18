import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import CameraButton from '../components/cameraButton';
import React, { useEffect, useMemo, useState } from 'react';
import CameraBottomIconContainer from '../components/cameraBottomIconContainer';
import PictureButton from '../components/pictureButton';

export default function PictureView({ navigation }) {
    const [cameraLoad, setCameraLoad] = useState(false);
    const [camera, setCamera] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [staticPermission, setStaticPermission] = useState(false);

    permissionFunction = async () => {
        const permission = await Camera.requestMicrophonePermissionsAsync();
        if (permission.granted) {
            setStaticPermission(true);
        }
    }

    useEffect(() => {
        permissionFunction();
    }, [])

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
        setCameraType(cameraType == Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
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
                                <CameraButton onPress={flipCamera} />
                                <PictureButton onPress={flipCamera} />
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