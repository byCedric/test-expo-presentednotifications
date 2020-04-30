import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [presented, setPresented] = useState<number>();

  const onCheck = useCallback(async () => {
    const result = await Notifications.getPresentedNotificationsAsync();
    console.log({ result });
    setPresented(result.length);
  }, []);

  const onSend = useCallback(() => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Look at that notification',
        body: "I'm so proud of myself!",
      },
      trigger: null,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.spacer}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button title='Send notification' onPress={onSend} />
      </View>
      <View style={styles.spacer}>
        <Text>{presented === undefined ? '?' : presented} notifications presented</Text>
        <Button title='Check notifications' onPress={onCheck} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    margin: 16,
  },
});
