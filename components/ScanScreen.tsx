import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import WifiManager from "react-native-wifi-reborn";
import { Button , NativeBaseProvider } from 'native-base';


const ScanScreen = () => {
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    requestCameraAndLocationPermission();
  }, []);

  async function requestCameraAndLocationPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ]);
      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Both permissions granted');
      } else {
        console.log('One or both permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }



  const onSuccess = async (event: BarCodeReadEvent) => {
    const wifiQRCodeData = event.data;
    try {
      const ssidMatch = wifiQRCodeData.match(/WIFI:S:([^;]+);/);
      const passwordMatch = wifiQRCodeData.match(/P:([^;]+)/);
      if (ssidMatch && passwordMatch) {
        const ssid =ssidMatch[1];
        const password =passwordMatch[1];
        console.log(`SSID: ${ssid}, Password: ${password}`);
        WifiManager.setEnabled(true);
        await WifiManager.connectToProtectedSSID(ssid,password,true);
        setConnected(true);
        
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
            {connected ? 'Connected to Wi-Fi' : 'OK. Got it!'}
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
    color: '#7FDBFF'
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

export default ScanScreen;
