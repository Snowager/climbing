import FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { ReactElement, useEffect, useState } from 'react';

// Hook that async returns an existing album on the user's android phone
export async function useAlbum(albumName): Promise<MediaLibrary.Album> {
    const [album, setAlbum] = useState<MediaLibrary.Album>(null);

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
    return album;
}