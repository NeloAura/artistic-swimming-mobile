import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity ,} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import WifiManager from 'react-native-wifi-reborn';
import {Button, NativeBaseProvider , Box,  Spinner} from 'native-base';
import socket from '../utils/socket';
import CryptoJS from "crypto-js";
import  Toast  from 'react-native-toast-message';
// import { env } from 'process';


export let serverSecretCode = '';
export let ip = '';
let judge = '';
const Socket = socket;
// const key = env("SECRET_KEY");
const key = "BBS"

export default function Home_QRCode ({navigation}) {
  const [connected, setConnected] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    Socket.initializeSocket(ip);
    Socket.on("status", (status) => {
      if (status === "200") {
        showSuccess('Authentication successful');
        setTimeout( ()=>{
          setIsLoading(false);
        navigation.navigate('Home_Events',  {judge} ); }
        ,3000);
        
      } else if (status === '401') {
        showError('An error occurred. Please try again.');
        setTimeout( ()=>{
          navigation.navigate('WelcomeScreen');}
          ,3000);
       
      }
    });
  }, [connected]);

  // Authentication
  async function authenticate(username, password, secret) {
    
    socket.emit('authenticate-j', {
      username,
      password,
      secret,
    });
    console.log(username, password, secret);
  }

  const showError = (message) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      backgroundColor: 'red',
    });
  };

  const showSuccess = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      backgroundColor: '#32CD32', // Custom color
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
            setIsLoading(true);
            authenticate(username, decryptedPassword, secretCode);
          }, 3000); // Delay of 100 milliseconds before calling authenticate
        }
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <NativeBaseProvider>
    <>
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
    {isLoading && (
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center">
          <Spinner color="white" />
        </Box>
      )}
      <Toast
        position='top'
        bottomOffset={20}
        
      />
</>
</NativeBaseProvider>
    
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


