import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

const DECKS_STORAGE_KEY = 'FlashCards:decks'
const NOTIFICATION_KEY = 'FlashCards:notifications'

export function fetchDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
        console.log("results::",results)
        console.log("parsing: ", JSON.parse(results))

        return (JSON.parse(results))
    })
}

export function saveDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function deleteDeck (key) {
    console.log("deleteDeck:", key)
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
        console.log("AFTER DELETE", JSON.stringify(data) )
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function saveQuestion(key,question) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key].questions.push(question)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}


 function createNotification () {
    return {
        title: 'Play a Deck today',
        body: "👋 don't forget to study your decks!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}


export async function  getPushNotificationPermissions() {
    const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {

        return;
    } else {

        await Notifications.cancelAllScheduledNotificationsAsync()

        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(20)
        tomorrow.setMinutes(0)

        await Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
                time: tomorrow,
                repeat: 'day',
            }
        )


        console.log(finalStatus)

        // Get the token that uniquely identifies this device
        console.log("Notification Token: ", await Notifications.getExpoPushTokenAsync());
    }
}
