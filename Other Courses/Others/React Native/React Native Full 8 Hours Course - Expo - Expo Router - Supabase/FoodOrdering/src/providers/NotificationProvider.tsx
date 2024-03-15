import * as Notifications from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<undefined | string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const { profile } = useAuth();

  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken);

    if (!newToken) {
      return;
    }

    // update the token in database
    await supabase
      .from("profiles")
      .update({ expo_push_token: newToken })
      .eq("id", profile.id);
  };

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) => savePushToken(token));
    //
    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     setNotification(notification);
    //   });
    //
    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     console.log(response);
    //   });
    //
    // return () => {
    //   if (notificationListener.current) {
    //     Notifications.removeNotificationSubscription(
    //       notificationListener.current
    //     );
    //   }
    //   if (responseListener.current) {
    //     Notifications.removeNotificationSubscription(responseListener.current);
    //   }
    // };
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
