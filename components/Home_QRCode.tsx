import { Center, Heading, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import WifiManager from "react-native-wifi-reborn";

function Home_QRCode() {
  const [ssid, setSSID] = useState("");
  const [password, setPassword] = useState("");

  const handleScan = (event: { data: any; }) => {
    const wifiQRCodeData = event.data;

    // Extract the SSID and password from the WiFi QR code data.
    const ssidMatch = wifiQRCodeData.match(/S:([^;]+)/);
    const passwordMatch = wifiQRCodeData.match(/P:([^;]+)/);
    if (ssidMatch && passwordMatch) {
      setSSID(ssidMatch[1]);
      setPassword(passwordMatch[1]);
      connectToHotspot(ssid,password)
    }

    async function connectToHotspot(ssid: string, password: string | null) {
        try {
          await WifiManager.connectToProtectedSSID(ssid, password, false);
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
      
      <QRCodeScanner onRead={handleScan} />
      
      </Center>
      </NativeBaseProvider>
      
      </>
  );
}

export default Home_QRCode;