import { Center, Heading, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import WifiManager from "react-native-wifi-reborn";
import {PermissionsAndroid} from 'react-native';
import { RNCamera,BarCodeReadEvent } from 'react-native-camera';




function Home_QRCode() {
  const [ssid, setSSID] = useState("");
  const [password, setPassword] = useState("");

 useEffect(() => {
    requestCameraPermission();
  }, []);
 
  
  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  
  
  
  const handleScan =  (event: BarCodeReadEvent) => {
    const wifiQRCodeData = event.data;

    // Extract the SSID and password from the WiFi QR code data.
    if (wifiQRCodeData) {
      // Extract the SSID and password from the WiFi QR code data.
      const ssidMatch = wifiQRCodeData.match(/S:([^;]+)/);
      const passwordMatch = wifiQRCodeData.match(/P:([^;]+)/);
      if (ssidMatch && passwordMatch) {
        WifiManager.setEnabled(true);
        setSSID(ssidMatch[1]);
        setPassword(passwordMatch[1]);
        connectToHotspot(ssid,password)
      }
    }

    async function connectToHotspot(ssid: string, password: string | null) {
        try {
          await WifiManager.connectToProtectedSSID(ssid, password, true);
          console.log("Connected to hotspot");
        } catch (error) {
          console.log(`Failed to connect to hotspot: ${error}`);
        }
      }

  };


  
  return (
    
    <>
    <NativeBaseProvider>
        <Center paddingTop={10}>
    <Heading size="lg" fontWeight="500" color="coolGray.800" _dark={{
          color: "warmGray.50" 
      }}>
          Scan The QR Code On Desktop
      </Heading>
      
      <QRCodeScanner onRead={handleScan} flashMode={RNCamera.Constants.FlashMode.auto}/>
      
      </Center>
      </NativeBaseProvider>
      
      </>
  );
}

export default Home_QRCode;