
import React from 'react';

import {
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';
import Home_QRCode from '../components/Home_QRCode';


function HomePage(): JSX.Element {
 
  return (
    <SafeAreaView style={{ flex: 1, height: '100%', width: '100%',  backgroundColor: 'lightblue' }}>
     <ScrollView>
      <View>
      <Home_QRCode/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}



export default HomePage;
