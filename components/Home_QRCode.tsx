import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import WifiManager from 'react-native-wifi-reborn';
import {Button, NativeBaseProvider, Toast} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import socket from '../utils/socket';

type RootStackParamList = {
  Home_Events: undefined;
  WelcomeScreen: undefined;
  // Add more screens here
};

type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WelcomeScreen',
  'Home_Events'
>;

interface Props {
  navigation: LoginNavigationProp;
}

export let serverSecretCode = '';

export let ip = '';
const Socket = socket;

const Home_QRCode = ({navigation}: Props) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    Socket.initializeSocket(ip);
    Socket.on('status', (status: string) => {
      if (status === '200') {
        navigation.navigate('Home_Events');
        console.log('Authentication succesfull');
        showError('Login successful.');
      } else if (status === '401') {
        navigation.navigate('WelcomeScreen');
        console.log('Authentication failed');
        showError('An error occurred. Please try again.');
      }
    });
  }, [connected]);

  // Authentication
  async function authenticate(username: any, password: any, secret: any) {
    console.log('Entered authenticate function');
    socket.emit('authenticate-j', {
      username,
      password,
      secret,
    });
  }

  const showError = (message: string) => {
    Toast.show({
      children: message,
      duration: 3000,
    });
  };

  const onSuccess = async (event: BarCodeReadEvent) => {
    const wifiQRCodeData = event.data;
    try {
      const ssidMatch = wifiQRCodeData.match(/WIFI:S:([^;]+);/);
      const passwordMatch = wifiQRCodeData.match(/P:([^;]+)/);
      const usernameMatch = wifiQRCodeData.match(/U:([^;]+)/);
      const userPasswordMatch = wifiQRCodeData.match(/Q:([^;]+);/);
      const ipAddressMatch = wifiQRCodeData.match(/T:IP;P:([^;]+)/);
      const secretCodeMatch = wifiQRCodeData.match(/T:SECRET;P:([^;]+)/);

      if (ssidMatch && passwordMatch && usernameMatch && userPasswordMatch) {
        const ssid = ssidMatch[1];
        const password = passwordMatch[1];
        const username = usernameMatch[1];
        const userPassword = userPasswordMatch[1];

        console.log(`SSID: ${ssid}, Password: ${password}`);
        console.log(`Username: ${username}, User Password: ${userPassword}`);

        if (ipAddressMatch && secretCodeMatch) {
          const ipAddress = ipAddressMatch[1];
          const secretCode = secretCodeMatch[1];
          console.log(`IP Address: ${ipAddress}, Secret Code: ${secretCode}`);
          ip = ipAddress;
          serverSecretCode = secretCode;

          WifiManager.setEnabled(true);
          await WifiManager.connectToProtectedSSID(ssid, password, true);
          setConnected(true);
          setTimeout(() => {
            authenticate(username, userPassword, secretCode);
          }, 3000); // Delay of 2 seconds before calling authenticate
        }
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
            <Button>{connected ? 'Conected' : 'Waiting to connect..'}</Button>
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
    color: '#000',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export {Home_QRCode};
