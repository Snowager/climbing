import { View, Text, Image, Button } from "react-native";
import * as imagePicker from 'expo-image-picker'
import { useEffect, useState } from "react";

export function LatestPhotoContainer({handleNavigate}) {

    const [image, setImage] = useState(null);

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
        <View style={{width:"100%", height:"10%", backgroundColor:"yellow", zIndex:2}}>
            {image && <Image source={{uri: image}} style={{width: "100%", height: "100%"}}/>}
            <Button title= {"Stuff here"} onPress={PickImage}/>
        </View>
        </>
    );
}