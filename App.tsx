//imports here
import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';
import Home_Manual from './components/Home_Manual';
import Home_QRCode from './components/Home_QRCode';
import ScanScreen from './components/ScanScreen';


function App(): JSX.Element {
 
  return (
    
      <View style={{ flex: 1, height: '100%', width: '100%',  backgroundColor: '#DDDDDD' }}>
      <ScanScreen/>
      </View>
     
  );
}



export default App;
