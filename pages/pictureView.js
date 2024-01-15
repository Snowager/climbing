import { StyleSheet, Text, View, Button } from 'react-native';
import TopBar from '../components/topBar';
import { Camera, CameraType } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useMemo, useState } from 'react';

export default function PictureView() {

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

    const gui = useMemo(() => {
        return (
            !staticPermission ?
                // Camera permissions are still loading
                <View>
                    <Text>Nothing</Text>
                </View>
                :
                <View style={styles.container}>
                    <Camera style={styles.camera} type={cameraType} ratio={'1:1'} ref={(ref) => setCamera(ref)}>
                    </Camera>
                </View>
        )
    }, [camera, cameraType, staticPermission]
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
        maxHeight: '1000px',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    }
});