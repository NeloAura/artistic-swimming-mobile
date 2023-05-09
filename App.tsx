//imports here
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Grade from './components/Grade';
import LoginComp from './components/Login';
import {Home_QRCode} from './components/Home_QRCode';
import WelcomeScreen from './components/WelcomeScreen';
import Home_Judge from './components/Home_Group';
import Judge_1 from './components/Judge_1';
import Judge_2 from './components/Judge_2';
import Judge_3 from './components/Judge_3';

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
          name="Home_Judge"
          component={Home_Judge}
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
          name="Judge_3"
          component={Judge_3}
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

        <Stack.Screen name="Login" component={LoginComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
