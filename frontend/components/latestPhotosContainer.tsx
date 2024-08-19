import { Image, ScrollView, TouchableOpacity } from "react-native";
import { ReactElement, useEffect, useState } from "react";
import * as mediaLibrary from "expo-media-library";

export const ALBUM_STRING = 'climbing'

export interface LatestPhotoContainerProps {
    handleNavigate: (image) => void,
    climbingAssets: mediaLibrary.Asset[],
    cameraLoad: boolean
}

// Horizontal scrolling view component that holds a scrolling list of photos from the climbing album and 
// navigates to the overlay on tap
export function LatestPhotoContainer({handleNavigate, climbingAssets, cameraLoad}: LatestPhotoContainerProps): ReactElement {

    /*const PickImage = async () => {
        let result = await imagePicker.launchImageLibraryAsync({
            mediaTypes: imagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        })
        setImage(result.assets[0])
        handleNavigate(image);
    }*/

    return (
        <>
        <ScrollView horizontal={true} style={{width: "100%", height: "20%", backgroundColor: 'black'}}>
            {climbingAssets && cameraLoad && climbingAssets.map((asset) => {
                console.log(asset.uri)
                return (
                    <TouchableOpacity onPress={() => handleNavigate(asset)} >
                        <Image source={{uri: asset.uri}} style={{width: 60, height: "100%"}} />
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
        {/*<View style={{width:"100%", height:"10%", backgroundColor:"yellow", zIndex:2}}>
            {image && <Image source={{uri: image}} style={{width: "100%", height: "100%"}}/>}
            <Button title= {"Stuff here"} onPress={PickImage}/>
        </View>*/}
        </>
    );
}