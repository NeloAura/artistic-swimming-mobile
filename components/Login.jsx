import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base';
import React, { useState , useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { serverSecretCode } from  './Home_QRCode.js';
import { socket, socket_emit } from '../utils/socket_io.js';


const secret = serverSecretCode;

async function authenticate(username, password ,secret ) {
  return socket_emit('authenticate-j', { username, password ,secret});
}



const Login = () => {
   
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  


  useEffect(() => {
    socket.on("status", (status) => {
      if (status === "200") {
        setAuthenticated(true);
        console.log("Authentication succesfull")
      }
    });
  }, []);


  const handleLogin = async () => {
    // Perform authentication check here
    // If authentication succeeds, set authenticated to true
    try {
     
      await authenticate(username, password , secret);
      
      
    } catch (error) {
      console.error(error);
    }
  };

    return(
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
            <Button onClick={handleLogin} mt="2" colorScheme="red" >
              Sign in
            </Button>
          </VStack>
        </Box>
      </Center>)
    
  };

  const LoginComp = () => (
    <NativeBaseProvider>
     <Login/>
    </NativeBaseProvider>
  )
  
export default LoginComp;
