import FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { useEffect, useState } from 'react';

export async function useAlbum(albumName) {
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const checkAlbum = async () => {
            let permission = await MediaLibrary.requestPermissionsAsync();
            if (permission.status !== "granted") {
                permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            } else {
                let newAlbum = await MediaLibrary.getAlbumAsync(albumName);
                setAlbum(newAlbum);
            }
        }
        checkAlbum();
    }, [albumName])
    //console.log(album);
    return album;
}