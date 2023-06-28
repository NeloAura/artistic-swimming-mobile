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
import { useNavigation } from '@react-navigation/native';
import {serverSecretCode} from './Home_QRCode';
import { ip } from './Home_QRCode';
import socket from "../utils/socket";
import Toast  from 'react-native-toast-message';



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

const handleSocket = async (judge,eventId,groupId,scoreData ) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit("add-score-group", {
      judgeUsername: judge,
      eventId: eventId,
      groupId: groupId,
      scoreData: scoreData,
    });
    socket.on("score-added-group", (score) => {
      resolve(score);
    });
    socket.on("connect_error", (error) => {
      reject(error);
      socket.removeListener();
    });
  });
};

const showError = (message) => {
  Toast.show({
    type: 'error',
    text1: message,
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
    backgroundColor: 'red',
  });
};

const showSuccess = (message) => {
  Toast.show({
    type: 'success',
    text1: message,
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
    backgroundColor: '#32CD32', // Custom color
  });
};




export default function ScoreGroup({  route }) {
  const { eventId, judge, groupId } = route.params;
  const [formData, setData] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');
  const [group, setGroup] = React.useState([]);
  const navigation = useNavigation();
  const [showConfirmation, setShowConfirmation] = React.useState(false);

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
    setShowConfirmation(true);
  };

  const handleConfirmation = () => {
    // Prepare the score data to send to the server
    setShowConfirmation(false);
    const scoreData = parseFloat(inputValue);
   
    // Validate the score
    if (isNaN(scoreData) || scoreData < 0 || scoreData > 10) {
      // Display an error message or take appropriate action
      showError('Invalid score');
      setInputValue('');
      return;
    }
  
    // Emit the score data to the server
    const emitScore = async () => {
      try {
        const result = await handleSocket(judge,eventId,groupId,scoreData);
        return result;
      } catch (error) {
        console.error("Error setting participants:", error);
      }
    };

     emitScore();
    
    // Navigate back to the Participant Screen
    setInputValue('');
    navigation.goBack();
  };

  
  const cancelConfirmation = () => {
    setShowConfirmation(false);
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
                Group
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
              maxLength={3}
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
      {showConfirmation && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
          bg="rgba(0, 0, 0, 0.6)"
        >
          <Box
            bg="white"
            p={4}
            rounded="md"
            shadow={4}
            width="80%"
            alignItems="center"
          >
            <Heading size="lg" mb={2}>
              Confirm Score Submission
            </Heading>
            <Text mb={4}>Score: {inputValue}</Text>
            <HStack justifyContent="center">
              <Button onPress={cancelConfirmation} colorScheme="gray">
                Cancel
              </Button>
              <Button
                onPress={handleConfirmation}
                colorScheme="red"
                ml={2}
              >
                Submit
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </NativeBaseProvider>
  );
}
