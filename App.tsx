//imports here
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Grade from './components/Grade';
import {Home_QRCode} from './components/Home_QRCode.tsx';
import WelcomeScreen from './components/WelcomeScreen';
import Judge_1 from './components/Judge_1';
import Judge_2 from './components/Judge_2';
import Score_3 from './components/Score_3.tsx';
import LoginScreen from './components/LoginScreen';
import {NativeBaseProviderProps} from 'native-base';
import Participant_1 from './components/Participant_1.tsx';
import Home_Events from './components/Home_Events.tsx';
import Participant_2 from './components/Participant_2.tsx';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bandabou-Splash-Application (BBS)"
          component={WelcomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#36b3c6',
            },
            navigationBarColor: '#36b3c6',
          }}
        />

        <Stack.Screen
          name="Home_QRCode"
          component={Home_QRCode}
          options={{
            title: 'Step 1',
            headerStyle: {
              backgroundColor: '#36b3c6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            navigationBarColor: '#36b3c6',
          }}
        />

        <Stack.Screen
          name="Home_Events"
          component={Home_Events}
          options={{
            title: 'Events',
            headerStyle: {
              backgroundColor: '#36b3c6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            navigationBarColor: '#36b3c6',
          }}
        />

        <Stack.Screen
          name="Judge_1"
          component={Judge_1}
          options={{
            title: 'Judge Screen',
            headerStyle: {
              backgroundColor: '#36b3c6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            navigationBarColor: '#36b3c6',
          }}
        />

        <Stack.Screen
          name="Judge_2"
          component={Judge_2}
          options={{
            title: 'Judge Screen',
            headerStyle: {
              backgroundColor: '#36b3c6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            navigationBarColor: '#36b3c6',
          }}
        />

        <Stack.Screen
          name="Score_3"
          component={Score_3}
          options={{
            title: 'Score',
            headerStyle: {
              backgroundColor: '#36b3c6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            navigationBarColor: '#36b3c6',
          }}
        />

        <Stack.Screen
          name="Participant_1"
          component={Participant_1}
          options={{
            title: 'Participants & Group',
            headerStyle: {
              backgroundColor: '#36b3c6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            navigationBarColor: '#36b3c6',
          }}
        />

        <Stack.Screen
          name="Participant_2"
          component={Participant_2}
          options={{
            title: 'Participants & Group',
            headerStyle: {
              backgroundColor: '#36b3c6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            navigationBarColor: '#36b3c6',
          }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={
            LoginScreen as React.ComponentType<NativeBaseProviderProps>
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
