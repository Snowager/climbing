import FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { ReactElement, useEffect, useState } from 'react';

export interface nameProp {
    albumName: string
}

export async function useAlbum(albumName): Promise<ReactElement<nameProp>>  {
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