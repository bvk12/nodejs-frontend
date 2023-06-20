import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/core";
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera'
import { FileSystem, Directory } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';


export function usePhotoCamUtil(){

  const [photos, setPhotos] = useState([]);
  const fileName = new Date().getTime() + '.jpeg';
  // snip - rest of code
  

    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      console.log("Photo",photo);
      const newPhotos = [
        {
          filepath: fileName,
          webviewPath: photo.webPath,
        },
        ...photos,
      ];
      setPhotos(newPhotos);
    }

    return { photos,takePhoto}
}