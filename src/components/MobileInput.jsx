import 'react-phone-number-input/style.css'
import PhoneInput2 from 'react-phone-input-2'
import { IonButton } from '@ionic/react'

export default function MobileInput(props) {
 const { mobileNumber, setMobileNumber} = props;
  
  return (<>  
    <PhoneInput2
      placeholder="Enter phone number"      
      country="in"
      enableSearch
      countryCodeEditable={false}
      value={mobileNumber}      
      onChange={setMobileNumber}/>
      <IonButton size="small" > Send Otp </IonButton> 
      </>
  )
}