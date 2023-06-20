import { createContext, useContext, useEffect, useState } from "react";
import _ from "lodash";

import { AuthContext } from "./AuthContextProvider";
import { SubscriptionAPI } from "../services/apis/SubscriptionAPI";
import {
  InstanceTypes,
  SubscriptionStatusTypes,
  SubscriptionTypes,
} from "../utils/constants";

export const SubscriptionContext = createContext();

const SubscriptionContextProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState();
  const [instances, setInstance] = useState();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (_.isEmpty(user)) {
      setSubscriptions();
      return;
    }

    getSubscriptions();
  }, [user]);

  useEffect(() => {
    getInstances();
  }, []);

  const getSubscriptions = async () => {
    try {
      const { data: subscriptionData } =
        await SubscriptionAPI.getAllSubscriptions();

      if (subscriptionData.status === "SUCCESS") {
        setSubscriptions(subscriptionData.data.subscriptions);
      } else {
        throw subscriptionData.message;
      }
    } catch (error) {
      console.error(
        "Subscription Context Provider: getSubscriptions: failed getting subscriptions,",
        error
      );
    }
  };

  const getInstances = async () => {
    try {
      const { data: instanceData } = await SubscriptionAPI.getInstanceDetails();
      if (instanceData.status === "SUCCESS") {
        setInstance(instanceData.data.instance);
      } else {
        throw instanceData.message;
      }
    } catch (error) {
      console.error(
        "Subscription Context Provider: getInstances: failed getting instances,",
        error
      );
    }
  };

  const isPlatformSubscriptionEnabled = () => {
    return (
      subscriptions.platform &&
      subscriptions.platform.status === SubscriptionStatusTypes.active
    );
  };

  const isProgramSubscriptionEnabled = (id) => {
    const program = subscriptions.programs?.find(
      (program) => program.id === id
    );

    return program && program.status === SubscriptionStatusTypes.active;
  };

  const isCourseSubscriptionEnabled = (id) => {
    const course = subscriptions.courses?.find((course) => course.id === id);
    return course && course.status === SubscriptionStatusTypes.active;
  };

  const isSubscriptionEnabled = (subscriptionType, id) => {
    if (!subscriptions) return false;

    switch (subscriptionType) {
      case SubscriptionTypes.platform:
        return isPlatformSubscriptionEnabled();
      case SubscriptionTypes.program:
        return isProgramSubscriptionEnabled(id);
      case SubscriptionTypes.course:
        return isCourseSubscriptionEnabled(id);
      default:
        return false;
    }
  };

  const isPartnerInstance = () => {
    const instance = getInstanceType();

    // for partner instance, return true
    if (instance === InstanceTypes.partner) {
      return true;
    }

    return false;
  };

  const getInstanceType = () => {
    // default is platformCourseProgram
    if (!instances) return InstanceTypes.platformCourseProgram;

    if (
      instances.platformInstanceEnabled &&
      !instances.courseProgramInstanceEnabled &&
      !instances.partnerInstanceEnabled
    ) {
      return InstanceTypes.platform;
    }

    if (
      instances.courseProgramInstanceEnabled &&
      !instances.partnerInstanceEnabled &&
      !instances.platformInstanceEnabled
    ) {
      return InstanceTypes.courseProgram;
    }

    if (
      instances.platformInstanceEnabled &&
      instances.courseProgramInstanceEnabled &&
      !instances.partnerInstanceEnabled
    ) {
      return InstanceTypes.platformCourseProgram;
    }

    if (
      instances.partnerInstanceEnabled &&
      !instances.platformInstanceEnabled &&
      !instances.courseProgramInstanceEnabled
    ) {
      return InstanceTypes.partner;
    }

    return InstanceTypes.platformCourseProgram;
  };

  const showPlatformPricing = () => {
    const instanceType = getInstanceType();

    if (
      instanceType === InstanceTypes.partner ||
      instanceType === InstanceTypes.courseProgram
    ) {
      return false;
    }

    const isSubscribed = isSubscriptionEnabled(SubscriptionTypes.platform);

    if (isSubscribed) return false;
    else return true;
  };

  const showCourseProgramPricing = (subscriptionType, id) => {
    const instanceType = getInstanceType();

    if (
      instanceType === InstanceTypes.partner ||
      instanceType === InstanceTypes.platform
    ) {
      return true;
    }

    const isSubscribed = isSubscriptionEnabled(subscriptionType, id);
    if (isSubscribed) return false;
    else {
      return true;
    }
  };

  const hideCourseProgramCart = (subscriptionType, id) => {
    const instanceType = getInstanceType();

    if (
      instanceType === InstanceTypes.platform ||
      instanceType === InstanceTypes.partner
    ) {
      return true;
    }

    if (isSubscriptionEnabled(SubscriptionTypes.platform)) return true;

    const isSubscribed = isSubscriptionEnabled(subscriptionType, id);
    if (isSubscribed) return true;
    else return false;
  };

  return (
    <SubscriptionContext.Provider
      value={{
        showPlatformPricing,
        showCourseProgramPricing,
        hideCourseProgramCart,
        isPartnerInstance,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionContextProvider;
