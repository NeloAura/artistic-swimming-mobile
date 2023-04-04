import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base';
import { NativeBaseProvider } from 'native-base';
import useSocket from '../utils/useUdp';

const Login = () => {
   
  const socket = useSocket();

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
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <Button mt="2" colorScheme="red">
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
