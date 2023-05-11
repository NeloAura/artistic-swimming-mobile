import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from 'native-base';
import React, {useState, useEffect, useCallback} from 'react';
import {NativeBaseProvider} from 'native-base';
import {serverSecretCode, serverIpAddress} from './Home_QRCode.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import socket from "../utils/socket";

type RootStackParamList = {
  Home_Events: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home_Events'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const ip = serverIpAddress;
const Socket= socket;


export default function LoginScreen({navigation}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  useEffect(() => {

    Socket.initializeSocket(ip);
    Socket.on("status", (status:string) => {
      if (status === "200") {
        navigation.navigate('Home_Events');
        console.log("Authentication succesfull")
      }
    });

  }, [Socket]);

  const handleLogin = async () => {
    // Perform authentication check here
    try {
      await authenticate(username, password);
      
      
    } catch (error) {
      console.error(error);
    }
  };
  
  async function authenticate(username: any, password: any){
    console.log(`${serverSecretCode}-${username}-${password}-${ip}-${socket}`);
    Socket.emit('authenticate-j', {
      username,
      password,
      secret: serverSecretCode,
    });
  }
    
  
  

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="#7FDBFF">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            Welcome Jugde
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Sign in to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                value={username}
                onChangeText={value => setUsername(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={value => setPassword(value)}
              />
            </FormControl>
            <Button
              onPress={handleLogin}
              mt="2"
              colorScheme="red"
              >
              Sign in
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
