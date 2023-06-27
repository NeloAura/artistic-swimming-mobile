//imports here
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home_QRCode} from './components/Home_QRCode.tsx';
import WelcomeScreen from './components/WelcomeScreen';
import Judge_1 from './components/Judge_1';
import Judge_2 from './components/Judge_2';
import Home_Events from './components/Home_Events.tsx';
import Participants from './components/Participants.tsx';
import Score from './components/Score.tsx';

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
          name="Score"
          component={Score}
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
          name="Participants"
          component={Participants}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
