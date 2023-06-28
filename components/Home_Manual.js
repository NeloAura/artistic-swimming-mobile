
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Container, VStack, FormControl,  Input, Button, Text , NativeBaseProvider, Center, Box, Heading} from 'native-base';
import wifi from "react-native-wifi-reborn";

function Home_Manual() {
  const [ssid, setSSID] = useState("");
  const [password, setPassword] = useState("");
  

  const connectToHotspot = async () => {
    try {
      await wifi.setEnabled(true); // make sure WiFi is enabled
      await wifi.connectToProtectedSSID(ssid,password,true);

      Alert.alert("Connected to hotspot successfully!");
    } 
     catch (error) {
      Alert.alert("Failed to connect to hotspot:", error.message);
    }
  };

  return (
    <NativeBaseProvider>
      <Center>
    <View >
      
      
    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50" 
      }}>
          Add Manualy
      </Heading>
    
      <Center w="100%">
    <Box safeArea  w="100%" maxW="700" marginTop={2}>
      <Container>
      <VStack space={3} mt="5">
    <FormControl>
      
        <Input 
          placeholder="SSID"
          value={ssid}
          onChangeText={setSSID}
          
        />
     
      
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      
      <Button onPress={connectToHotspot} colorScheme="red" marginTop={2}>
        <Text>Connect to hotspot</Text>
      </Button>
    </FormControl>
  </VStack>
</Container>
</Box>
    </Center>

    </View>
    </Center>
    </NativeBaseProvider>
  );
}


export default Home_Manual;


