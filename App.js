//imports here
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home_QRCode from './components/Home_QRCode';
import WelcomeScreen from './components/WelcomeScreen';
import Home_Events from './components/Home_Events';
import Participants from './components/Participants';
import ScoreParticipant from './components/ScoreParticipant';
import ScoreGroup from './components/ScoreGroup';

const Stack = createNativeStackNavigator();

const App = () => {
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
            headerBackVisible: false,
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

        <Stack.Screen
          name="ScoreParticipant"
          component={ScoreParticipant}
          options={{
            title: 'ScoreParticipant',
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
          name="ScoreGroup"
          component={ScoreGroup}
          options={{
            title: 'ScoreGroup',
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
};

export default App;
