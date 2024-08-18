import { View, Text, Image, Button } from "react-native";
import * as imagePicker from 'expo-image-picker'
import { ReactElement, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import * as mediaLibrary from "expo-media-library";

export interface LatestPhotoContainerProps {
    handleNavigate: (image) => void
}

export function LatestPhotoContainer({handleNavigate}: LatestPhotoContainerProps): ReactElement {

    const [image, setImage] = useState(null);

    const ALBUM_STRING = 'climbing'

    const [climbingAssets, setClimbingAssets] = useState<mediaLibrary.Asset[]>([]);

    useEffect(() => {
        setPictureContainer();
    }, [])

    const setPictureContainer = async () => {
        const album: mediaLibrary.Album = await mediaLibrary.getAlbumAsync(ALBUM_STRING)
        const assets: mediaLibrary.PagedInfo<mediaLibrary.Asset> = await mediaLibrary.getAssetsAsync({album: album});
        setClimbingAssets(assets.assets)
    }

    useEffect(() => {
        if (image) {
            handleNavigate(image)
        }
    }, [image])

    const PickImage = async () => {
        let result = await imagePicker.launchImageLibraryAsync({
            mediaTypes: imagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        })
        setImage(result.assets[0].uri)
        handleNavigate(image);
    }





    return (
        <>
        <ScrollView horizontal={true}>
            {climbingAssets && climbingAssets.map((asset) => {
                return (
                    <Image source={{uri: asset.uri}} style={{width: "100%", height: "20%"}} />
                )
            })}
        </ScrollView>
        <View style={{width:"100%", height:"10%", backgroundColor:"yellow", zIndex:2}}>
            {image && <Image source={{uri: image}} style={{width: "100%", height: "100%"}}/>}
            <Button title= {"Stuff here"} onPress={PickImage}/>
        </View>
        </>
    );
}