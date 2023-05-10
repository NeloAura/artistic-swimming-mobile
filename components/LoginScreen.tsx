import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base';
import React, { useState , useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { serverSecretCode , serverIpAddress } from  './Home_QRCode.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import io from 'socket.io-client';

const secret = serverSecretCode;
const ip = serverIpAddress;
const socket = io(`http://${ip}:3001}`); // Initialize socket outside of handleLogin function

async function authenticate(username:any, password:any ,secret:any , socket : any ) {
  console.log(`${secret}-${username}-${password}-${ip}`)
  return socket.emit('authenticate-j', { username, password ,secret});
}

type RootStackParamList = {
  Home_Judge: undefined; // Added new screen here
}

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home_Judge'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen ({navigation}: Props){
   
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const secret = serverSecretCode;
  const ip = serverIpAddress;

  useEffect(() => {
    const socket = io(`http://${ip}:3001`);

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("status", (status) => {
      if (status === "200") {
        setAuthenticated(true);
        console.log("Authentication successful");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [ip]);

  const handleLogin = async () => {  
    const socket = io(`http://${ip}:3001`);
    try {
      await authenticate(username, password, secret, socket);
    } catch (error) {
      console.error(error);
    } finally {
      socket.disconnect();
    }
  };
 
  const handleSubmit = () => {
    // Navigate to Judge screen
    navigation.navigate('Home_Judge');
  };

  if (authenticated) {
    return handleSubmit();
  }
  
  return(
    <NativeBaseProvider>
      <Center flex={1} bg="#7FDBFF">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            Welcome Jugde
          </Heading>
          <Heading mt="1" _dark={{
            color: "warmGray.200"
          }} color="coolGray.600" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input value={username} onChangeText={(value) => setUsername(value)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input  type="password" value={password} onChangeText={(value) => setPassword(value)}/>
            </FormControl>
            <Button onPress={handleLogin} mt="2" colorScheme="red" >
              Sign in
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
};