import React  from 'react';
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
import Toast  from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


const fetchParticipant = async (participantId) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit("fetchParticipant",{id:participantId,serverSecretCode});
    socket.on("participantData", (participant) => {
      resolve(participant);
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
    visibilityTime: 3000,
    autoHide: true,
  });
};

const showSuccess = (message) => {
  Toast.show({
    type: 'success',
    text1: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
  });
};



export default function ScoreParticipant({ route }) {
  const { eventId, judge, participantId } = route.params;
  const [formData, setData] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');
  const [participant, setParticipant] = React.useState([]);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchParticipantData = async () => {
      try {
        const participantData = await fetchParticipant(participantId);
        console.log(participantData);
        setParticipant(participantData);
      } catch (error) {
        console.error("Error setting participants:", error);
      }
    };

    fetchParticipantData();
  }, []);



  const onSubmit = () => {
    setShowConfirmation(true);
  };


const handleConfirmation = () => {
    
    setShowConfirmation(false);

    // Prepare the score data to send to the server
    const scoreData = parseFloat(inputValue);

    // Validate the score
    if (isNaN(scoreData) || scoreData < 0 || scoreData > 10) {
      // Display an error message or take appropriate action
      setInputValue('');
      showError('Invalid score');
      return;
    }

    // Emit the score data to the server
    console.log(judge,eventId,participantId,scoreData);
    socket.emit("add-score",{judge,eventId,participantId,scoreData});
    console.log('Submitted');
    // Navigate back to the Participant Screen
    showSuccess("Score Added")
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
                Participant 
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
                {`${participant.firstName} ${participant.lastName}`}
              </Text>
            </Stack>
            <Text fontWeight="400" fontSize="8xl" >
            {participant.generatedNumber}
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
      <Toast
        position='top'
        bottomOffset={20}
      />
    </NativeBaseProvider>
  );
}
