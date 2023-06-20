import { IonCol, IonGrid, IonRow, IonSpinner } from "@ionic/react";

const LoadingView = () => {
  return (
    <IonGrid style={{ width: "100%", height: "100%" }}>
      <IonRow
        className="ion-align-items-center ion-justify-content-center"
        style={{ width: "100%", height: "100%" }}
      >
        <IonCol size="2">
          <IonSpinner name="circles"></IonSpinner>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LoadingView;
