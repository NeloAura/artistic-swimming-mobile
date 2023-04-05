//imports here
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Grade from './components/Grade';
// import LoginComp from './components/Login';
import { Home_QRCode } from  './components/Home_QRCode';
import WelcomeScreen from './components/WelcomeScreen';

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
      navigationBarColor:'#36b3c6'
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
          navigationBarColor:'#36b3c6'
        }}
    />
  
    </Stack.Navigator>
  </NavigationContainer>

   
    
  );
}



export default App;
