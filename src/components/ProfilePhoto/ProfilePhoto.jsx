import { usePhotoCamUtil } from "./usePhotoCamUtil";
import { IonRow, IonCol, IonImg, IonButton } from "@ionic/react";
//https://ionicframework.com/docs/react/your-first-app/taking-photos
export const ProfilePhoto = () => {
    const { photos, takePhoto } = usePhotoCamUtil();
    const takeThePhoto = () => {
        takePhoto().then((r) => {
            console.log("Finished the takePhoto", r)
        })
    }
       return (
        <div>
            <IonRow>
                <IonCol>
                    <IonButton fill="solid" onClick={takeThePhoto}>Take Photo</IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
                {photos.map((photo, index) => (
                    <IonCol size="6" key={index}>
                        <IonImg title={index} src={photo.webviewPath} />
                    </IonCol>
                ))}
            </IonRow>
        </div>)
}