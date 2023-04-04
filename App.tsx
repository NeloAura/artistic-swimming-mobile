//imports here
import React from 'react';
import {
  ScrollView,
} from 'react-native';

// import Grade from './components/Grade';
// import LoginComp from './components/Login';
import module from  './components/Home_QRCode';
const { Home_QRCode, serverIpAddress } = module;

function App(): JSX.Element {
 
  return (
    
    
      <Home_QRCode/>
   
    
  );
}



export default App;
