import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import WifiManager from 'react-native-wifi-reborn';
import {Button, NativeBaseProvider, Toast} from 'native-base';
import socket from '../utils/socket';
import CryptoJS from "crypto-js";
// import { env } from 'process';


export let serverSecretCode = '';
export let ip = '';
let judge = '';
const Socket = socket;
// const key = env("SECRET_KEY");
const key = "BBS"

const Home_QRCode = ({navigation}) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    Socket.initializeSocket(ip);
    Socket.on("status", (status) => {
      if (status === "200") {
        navigation.navigate('Home_Events',  {judge} ); // Pass username as navigation parameter
        console.log('Authentication successful');
        showError('Login successful.');
      } else if (status === '401') {
        navigation.navigate('WelcomeScreen');
        console.log('Authentication failed');
        showError('An error occurred. Please try again.');
      }
    });
  }, [connected]);

  // Authentication
  async function authenticate(username, password, secret) {
    console.log('Entered authenticate function');
    socket.emit('authenticate-j', {
      username,
      password,
      secret,
    });
    console.log(username, password, secret);
  }

  const showError = (message) => {
    Toast.show({
      children: message,
      duration: 3000,
    });
  };

  const onSuccess = async (event) => {
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
          judge = username;

          WifiManager.setEnabled(true);
          await WifiManager.connectToProtectedSSID(ssid, password, true);
          setConnected(true);
          
          const decryptedPassword = CryptoJS.AES.decrypt(
            userPassword,
            key
          ).toString(CryptoJS.enc.Utf8);

          setTimeout(() => {
            authenticate(username, decryptedPassword, secretCode);
          }, 3000); // Delay of 100 milliseconds before calling authenticate
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
