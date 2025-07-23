import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'default',
    channelName: 'Default Channel',
    importance: 4,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);
