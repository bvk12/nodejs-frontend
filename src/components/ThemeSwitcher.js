import { IonToggle } from "@ionic/react";
export const ThemeSwitcher = () => {
    function toggleDarkTheme(e) {  document.body.classList.toggle('dark');   }
        return( <IonToggle color="dark"  onIonChange={toggleDarkTheme} slot="end"></IonToggle>);
}