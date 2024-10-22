import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { EXPO_PUSH_TOKEN, EXPO_PROJECT_ID } from 'react-native-dotenv';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const projectId = EXPO_PROJECT_ID ? EXPO_PROJECT_ID : process.env.EXPO_PROJECT_ID;
const pushTokenFromEnv = EXPO_PUSH_TOKEN ? EXPO_PUSH_TOKEN : process.env.EXPO_PUSH_TOKEN;

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the permissions."
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(
          "Notification received",
          JSON.stringify(notification, null, 2)
        );
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          "Notification response received",
          JSON.stringify(response, null, 2)
        );
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Permission to show notifications has not been granted.");
  //     }
  //   })();
  // }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My First Local Notify",
        body: "This is the body of the notification",
        data: { userName: "Burak" },
      },
      trigger: {
        seconds: 2,
      },
    });
  }

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushTokenFromEnv,
        title: "Test - Sent from a device!",
        body: "This is a test for sax!",
      }),
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
