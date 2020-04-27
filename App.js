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
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from "./reducers"
import {createNotification, getPushNotificationPermissions} from "./utils/api";
const Stack = createStackNavigator();

class App extends Component {



        componentDidMount()
        {
            getPushNotificationPermissions()
            //setLocalNotification()

        }
        render()
        {
            return (
                <Provider store={createStore(reducer)}>
                    <SafeAreaProvider>

                        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1"/>
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName="Home">
                                <Stack.Screen name="Home" component={Home}/>
                                <Stack.Screen name="AddQuestion" component={AddQuestion}/>
                                <Stack.Screen name="AddDeck" component={AddDeck}/>
                                <Stack.Screen name="Deck" component={DeckPage}/>
                                <Stack.Screen name="Quiz" component={Quiz} options={{headerLeft: null}}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    </SafeAreaProvider>
                </Provider>
            );
        }

    }
    export default App
