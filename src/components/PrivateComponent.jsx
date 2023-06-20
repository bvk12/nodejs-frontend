import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const PrivateComponent = ({ children, route }) => {
  let { isRouteShown } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState();

  const checkAccess = async () => {
    const showRoute = await isRouteShown(route);
    setIsVisible(showRoute);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  return <>{isVisible && children}</>;
};

export default PrivateComponent;
