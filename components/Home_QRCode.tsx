import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import WifiManager from "react-native-wifi-reborn";
import { Button , NativeBaseProvider } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  LoginScreen: undefined;
  // Add more screens here
};

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface Props {
  navigation: LoginNavigationProp;
}
let serverIpAddress = '';
let serverSecretCode ='';

const Home_QRCode = ({ navigation }: Props) => {
  const [connected, setConnected] = useState(false);
 

  const onSuccess = async (event: BarCodeReadEvent) => {
    const wifiQRCodeData = event.data;
    try {
      const ssidMatch = wifiQRCodeData.match(/WIFI:S:([^;]+);/);
      const passwordMatch = wifiQRCodeData.match(/P:([^;]+)/);
      const ipAddressMatch = wifiQRCodeData.match(/T:IP;P:([^;]+)/);
      const secretCodeMatch = wifiQRCodeData.match(/T:SECRET;P:([^;]+)/);
      if (ssidMatch && passwordMatch) {
        const ssid = ssidMatch[1];
        const password = passwordMatch[1];
        console.log(`SSID: ${ssid}, Password: ${password}`);
        
        if (ipAddressMatch && secretCodeMatch) {
          const ipAddress = ipAddressMatch[1];
          const secretCode = secretCodeMatch[1];
          console.log(`IP Address: ${ipAddress}, Secret Code: ${secretCode}`);
          serverIpAddress = ipAddress;
          serverSecretCode = secretCode;
        }
        WifiManager.setEnabled(true);
        await WifiManager.connectToProtectedSSID(ssid, password, true);
        setConnected(true);
        navigation.navigate('LoginScreen')
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.auto}
      topContent={
        <Text style={styles.centerText}>
           Scan the QRCode on the Desktop App
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <NativeBaseProvider>
          <Button >
            {connected ? 'Conected' : 'Waiting to connect..'}
          </Button>
          </NativeBaseProvider>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    fontWeight: '500',
    color: '#000'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export { Home_QRCode, serverIpAddress ,serverSecretCode };