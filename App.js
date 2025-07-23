import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: 'default',
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body || '',
      });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      PushNotification.localNotification({
        channelId: 'default',
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body || '',
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
        }
      });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  return (
    <View>
      <Text>Push Notification Demo</Text>
    </View>
  );
};

export default App;
