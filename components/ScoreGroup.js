import React from 'react';
import {
  VStack,
  Box,
  NativeBaseProvider,
  FormControl,
  Input,
  WarningOutlineIcon,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
} from 'native-base';
import {serverSecretCode} from './Home_QRCode';
import { ip } from './Home_QRCode';
import socket from "../utils/socket";




const fetchGroup = async (groupId) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit("fetchGroup",{id:groupId,serverSecretCode});
    socket.on("groupData", (group) => {
      resolve(group);
    });
    socket.on("connect_error", (error) => {
      reject(error);
      socket.removeListener();
    });
  });
};


export default function ScoreGroup({ route }) {
  const { eventId, judge, groupId } = route.params;
  const [formData, setData] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');
  const [group, setGroup] = React.useState([]);

  React.useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await fetchGroup(groupId);
        setGroup(groupData);
      } catch (error) {
        console.error("Error setting groups:", error);
      }
    };

    fetchGroupData();
  }, []);

  const onSubmit = () => {
    console.log('Submitted');
    setInputValue('');
  };



  return (
    <NativeBaseProvider >
      <Box alignItems="center" pt="4">
        <Box //Top Card
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Stack
            alignItems="center" //Textbox
            p="4"
            space={3}>
            <Stack space={2} alignItems="center">
              <Heading size="md" ml="-1">
                Group {groupId}
              </Heading>
              <Text 
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1">
                {group.groupName}
              </Text>
            </Stack>
            <Text fontWeight="400" fontSize="8xl" >
            {group.generatedNumber}
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"></HStack>
          </Stack>
        </Box>
      </Box>

      <Box //Form & Button
        alignItems="center">
        <VStack>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Score
            </FormControl.Label>
            <Input
              keyboardType="numeric"
              maxLength={2}
              placeholder="0-10"
              onChangeText={value => {
                setData({...formData, name: value});
                setInputValue(value);
              }}
              value={inputValue}
              width="20%"
              size="2xl"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Error encountered.
            </FormControl.ErrorMessage>
          </FormControl>
          <Button onPress={onSubmit} mt="5" colorScheme="red">
            Submit
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
