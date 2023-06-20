import { useEffect, useState } from "react";
import { AdminAPI } from "../../../services/apis/AdminAPI";
import { SystemSettings } from "./SystemSettings";

export const DynamicInputForm = (formName="system_settings") => {

  const [defaultValues, setDefaultValues] = useState(null);
  const [dynamicForm, setDynamicForm] = useState(null);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    AdminAPI.getConfigSettings({ name: "system_settings" }).then((response) => {
      setDynamicForm(response.data.metaData);
      setDefaultValues(response.data.data)
     console.log("Data recieved...", formName, response.data);
      setIsLoading(false)
    });
  }, [formName]);

  return (
    <> 
    {isLoading ? <>Loading data...</> : 
    <SystemSettings 
        defaultValues={defaultValues} 
        dynamicForm={dynamicForm}>
    </SystemSettings>
    }
    </>       
  );
};
