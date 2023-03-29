
import React from 'react';

import {
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';
import Home_Manual from '../components/Home_Manual';
import Home_QRCode from '../components/Home_QRCode';


function HomePage(): JSX.Element {
 
  return (
    <SafeAreaView style={{ flex: 1, height: '100%', width: '100%',  backgroundColor: 'lightblue' }}>
     <ScrollView>
      <View>
      <Home_QRCode/>
      <Home_Manual/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}



export default HomePage;
