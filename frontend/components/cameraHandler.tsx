import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import FlipCameraButton from '../components/flipCameraButton';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import CameraBottomIconContainer from '../components/cameraBottomIconContainer';
import TakePictureButton from '../components/takePictureButton';
import * as MediaLibrary from 'expo-media-library';
import { useAlbum } from '../hooks/useAlbum';
import { ALBUM_STRING, LatestPhotoContainer } from '../components/latestPhotosContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

// interface for CameraHandlerProps
export interface CameraHandlerProps {
    navigation: NativeStackScreenProps<RootStackParamList, 'Camera'>
} 

export function CameraHandler({navigation}): ReactElement<CameraHandlerProps> {
    const [cameraLoad, setCameraLoad] = useState(false);
    const [camera, setCamera] = useState(null);
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [staticPermission, setStaticPermission] = useState(false);
    const [climbingAssets, setClimbingAssets] = useState<MediaLibrary.Asset[]>([]);

    // hook to get album async
    const album = useAlbum(ALBUM_STRING);

    // gets permission for using camera
    async function permissionFunction(): Promise<void> {
        const permission = await Camera.requestCameraPermissionsAsync();
        if (permission.granted) {
            setStaticPermission(true);
        }
    }

    // attempts to get permission on initial load
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

    useEffect(() => {
        setPictureContainer();
    }, [])

    function flipCamera(): void {
        setCameraType(cameraType == CameraType.back ? CameraType.front : CameraType.back)
    }

    // takes a picture and saves to library and climbing album
    async function takePicture(): Promise<void> {
        if (!camera) {
            return
        }
        const photo: MediaLibrary.Asset = await camera.takePictureAsync();
        if (permissionResponse) {
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            const asset = await MediaLibrary.createAssetAsync(photo.uri)
            await MediaLibrary.addAssetsToAlbumAsync(asset, (await album).id)
        }
        setPictureContainer();
    }

    // handles setting scrolling picture container with album picture assets
    const setPictureContainer = async () => {
        const album: MediaLibrary.Album = await MediaLibrary.getAlbumAsync(ALBUM_STRING)
        const assets: MediaLibrary.PagedInfo<MediaLibrary.Asset> = await MediaLibrary.getAssetsAsync({album: album});
        for (let asset of assets.assets) {
            console.log(asset.filename)
        }
        setClimbingAssets(assets.assets)
    }

    // handles navigation with image asset background to overlay --TODO-- make reusable export function
    function handleNavigate(image) {
        console.log(image)
        if (image) {
            navigation.navigate('Overlay', {
                imageAsset: image,
            })
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
                                <TakePictureButton onPress={takePicture} />
                                <FlipCameraButton onPress={flipCamera} />
                            </CameraBottomIconContainer>
                        </Camera>}
                        <LatestPhotoContainer handleNavigate={handleNavigate} climbingAssets={climbingAssets} cameraLoad={cameraLoad}/>
                </View>
        )
    }, [camera, cameraType, staticPermission, cameraLoad, album, climbingAssets]
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
        height: "90%",
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});