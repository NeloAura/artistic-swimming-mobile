//imports here
import React from 'react';
import {
  ScrollView,
} from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import Grade from './components/Grade';


function App(): JSX.Element {
 
  return (
    
    <ScrollView>
    <WelcomeScreen/>
    </ScrollView>
    
  );
}



export default App;
