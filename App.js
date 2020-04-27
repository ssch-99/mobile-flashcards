import React, {Component} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AddQuestion from "./components/AddQuestion";
import AddDeck from "./components/AddDeck";
import DeckPage from "./components/DeckPage";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from "./reducers"
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const Stack = createStackNavigator();

class App extends Component {


    getPushNotificationPermissions = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
        console.log(finalStatus)

        // Get the token that uniquely identifies this device
        console.log("Notification Token: ", await Notifications.getExpoPushTokenAsync());
    }



    componentDidMount() {
        this.getPushNotificationPermissions()
        //setLocalNotification()
    }
    render() {
        return (
            <Provider store={createStore(reducer)}>
            <SafeAreaProvider>

                <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="AddQuestion" component={AddQuestion} />
                    <Stack.Screen name="AddDeck" component={AddDeck} />
                    <Stack.Screen name="Deck" component={DeckPage} />
                    <Stack.Screen name="Quiz" component={Quiz} options={{ headerLeft: null }} />
                </Stack.Navigator>
            </NavigationContainer>
            </SafeAreaProvider>
            </Provider>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
