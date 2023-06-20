import React from "react";
import { IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import {  Form} from 'react-bootstrap';

const HookFormInputField = (props) => {
  const { 
    name, 
    control, 
    component, 
    label, 
    error, 
    rules, 
    style, 
    className 
  } =  props; 

  return (
    <div style={style} className={className}>        
    {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          React.cloneElement(component, {
            ...field,            
            onIonChange: field.onChange,
          })
        }
        rules={rules}
      />    
      { error && <IonText color="danger">{error.message}</IonText> }    
    </div>
  );
};

export default HookFormInputField;
