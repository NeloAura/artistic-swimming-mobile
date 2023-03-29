
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoginComp from '../components/Login';







function LoginPage(): JSX.Element {
 
  const isLightMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: Colors.white,
  };

  return (
    <SafeAreaView style={{ flex: 1, height: '100%', width: '100%',  backgroundColor: 'white' }}>
      <StatusBar
        barStyle={isLightMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle.backgroundColor}>
       
        <View
           style={{backgroundColor: 'white' }}>
          <LoginComp/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



export default LoginPage;
