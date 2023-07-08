import React, {useEffect, useState} from 'react';
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
  Spinner,
  ScrollView,
} from 'native-base';
import {serverSecretCode} from './Home_QRCode';
import {ip} from './Home_QRCode';
import socket from '../utils/socket';
import Toast from 'react-native-toast-message';
import {BackHandler} from 'react-native';

const fetchParticipant = async participantId => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit('fetchParticipant', {id: participantId, serverSecretCode});
    socket.on('participantData', participant => {
      resolve(participant);
    });
    socket.on('connect_error', error => {
      reject(error);
      socket.removeListener();
    });
  });
};

const handleSocket = async (
  judge,
  eventId,
  judgeType,
  participantId,
  scoreData,
) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit('add-score', {
      username: judge,
      eventId: eventId,
      type: judgeType,
      participantId: participantId,
      scoreData: scoreData,
    });
    socket.on('score-added', score => {
      resolve(score);
    });
    socket.on('connect_error', error => {
      reject(error);
      socket.removeListener();
    });
  });
};

const showError = message => {
  Toast.show({
    type: 'error',
    text1: message,
    visibilityTime: 3000,
    autoHide: true,
  });
};

const showSuccess = message => {
  Toast.show({
    type: 'success',
    text1: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
  });
};

export default function ScoreParticipant({route, navigation}) {
  const {eventId, judge, participantId, eventType} = route.params;
  const [refreshKey, setRefreshKey] = useState(0);
  const [formData, setData] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [participant, setParticipant] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [judgeTypes, setJudgeTypes] = useState(eventType);
  const [judgeType, setJudgeType] = useState('');

  useEffect(() => {
    const disableBackButton = () => true;
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
    };
  }, []);

  useEffect(() => {
    const fetchParticipantData = async () => {
      try {
        const participantData = await fetchParticipant(participantId);
        console.log(participantData);
        setParticipant(participantData);
      } catch (error) {
        console.error('Error setting participants:', error);
      }
    };

    fetchParticipantData();
  }, []);

  const onSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async () => {
    setShowConfirmation(false);

    const refreshPage = async () => {
      setRefreshKey(prevKey => prevKey + 1); // Update the refresh key to force a refresh
    };

    // Prepare the score data to send to the server
    const scoreData = parseFloat(inputValue);

    // Validate the score
    if (isNaN(scoreData) || scoreData < 0 || scoreData > 10) {
      // Display an error message or take appropriate action
      setInputValue('');
      showError('Invalid score');
      return;
    }

    // Show loading screen
    showSuccess('Score Added');
    setIsLoading(true);

    setTimeout(async () => {
      // Emit the score data to the server
      console.log(judge, eventId, participantId, scoreData);
      await handleSocket(judge, eventId, judgeType, participantId, scoreData);

      // Remove the scored type from judgeTypes
      // Remove the scored type from judgeTypes
      const updatedTypes = judgeTypes.filter(type => {
        // Check if the judge type matches the current type
        return type.name.toLowerCase() !== judgeType.toLowerCase();
      });
      setJudgeTypes(updatedTypes);

      // Check if it's the last card
      if (updatedTypes.length === 0) {
        // Navigate to the Participants Screen after emitting the score
        await refreshPage();
        setIsLoading(false);
        navigation.navigate('Home_Events', {
          judge: judge,
        });
      }
      setIsLoading(false);
      setInputValue('');
    }, 3000);
  };

  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <NativeBaseProvider>
      <VStack flex={1} p={4}>
        <Box flex={1} bg="white" position="relative" overflowY="auto">
          {judgeTypes.map(type => (
            <Box
              key={type.id}
              maxW="100%"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              mt={2}
              p={4}
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
              <Box alignItems="center">
                <Stack alignItems="center" p="4" space={3}>
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
                  <Text fontWeight="400" fontSize="8xl">
                    {participant.generatedNumber}
                  </Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"></HStack>
                </Stack>
                <Text
                  fontSize="md"
                  _light={{
                    color: 'violet.500',
                  }}
                  _dark={{
                    color: 'violet.400',
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1">
                  {type.name}
                </Text>
                <VStack>
                  <FormControl isRequired>
                    <FormControl.Label _text={{bold: true}}>
                      Score
                    </FormControl.Label>
                    <Input
                      keyboardType="numeric"
                      maxLength={3}
                      placeholder="0-10"
                      onChangeText={value => {
                        setData({...formData, name: value});
                        setInputValue(value);
                        setJudgeType(type.name);
                      }}
                      value={inputValue}
                      width="75%"
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
            </Box>
          ))}
        </Box>

        {showConfirmation && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bg="rgba(0, 0, 0, 0.6)"
            alignItems="center"
            justifyContent="center"
            height="100%"
            zIndex={999}>
            <Box
              bg="white"
              padding={6}
              borderRadius={8}
              width="90%"
              maxWidth={400}
              alignItems="center">
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Confirm Score Submission
              </Text>
              <Text mb={4}>
                Are you sure you want to submit the score {inputValue} for
                participant {`${participant.firstName} ${participant.lastName}`}
                ?
              </Text>
              <HStack space={2}>
                <Button
                  onPress={handleConfirmation}
                  colorScheme="green"
                  isLoading={isLoading}
                  loadingText="Submitting...">
                  Yes
                </Button>
                <Button onPress={cancelConfirmation} colorScheme="red">
                  No
                </Button>
              </HStack>
            </Box>
          </Box>
        )}
        {isLoading && (
          <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0, 0, 0, 0.5)"
            justifyContent="center"
            alignItems="center">
            <Spinner color="white" />
          </Box>
        )}
        <Toast position="top" bottomOffset={20} />
      </VStack>
    </NativeBaseProvider>
  );
}
