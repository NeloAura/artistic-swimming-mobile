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
  Spinner,
  ScrollView,
} from 'native-base';
import {serverSecretCode} from './Home_QRCode';
import {ip} from './Home_QRCode';
import socket from '../utils/socket';
import Toast from 'react-native-toast-message';
import {BackHandler} from 'react-native';

const fetchGroup = async groupId => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit('fetchGroup', {id: groupId, serverSecretCode});
    socket.on('groupData', group => {
      resolve(group);
    });
    socket.on('connect_error', error => {
      reject(error);
      socket.removeListener();
    });
  });
};

const handleSocket = async (judge, eventId, judgeType, groupId, scoreData) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit('add-score-group', {
      judgeUsername: judge,
      eventId: eventId,
      type: judgeType,
      groupId: groupId,
      scoreData: scoreData,
    });
    socket.on('score-added-group', score => {
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
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    backgroundColor: 'red',
  });
};

const showSuccess = message => {
  Toast.show({
    type: 'success',
    text1: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    backgroundColor: '#32CD32', // Custom color
  });
};

export default function ScoreGroup({route, navigation}) {
  const {eventId, judge, groupId, eventType} = route.params;
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [formData, setData] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');
  const [group, setGroup] = React.useState([]);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [judgeTypes, setJudgeTypes] = React.useState(eventType);
  const [judgeType, setJudgeType] = React.useState('');

  React.useEffect(() => {
    const disableBackButton = () => true;
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
    };
  }, []);

  React.useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await fetchGroup(groupId);
        setGroup(groupData);
      } catch (error) {
        console.error('Error setting groups:', error);
      }
    };

    fetchGroupData();
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
      console.log(judge, eventId, judgeType, groupId, scoreData);
      await handleSocket(judge, eventId, judgeType, groupId, scoreData);

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
      <VStack flex={1} p={4} overflowY="auto">
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
                  <Text fontWeight="400" fontSize="8xl">
                    {group.generatedNumber}
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
              p={4}
              rounded="md"
              shadow={4}
              width="80%"
              alignItems="center">
              <Heading size="lg" mb={2}>
                Confirm Score Submission
              </Heading>
              <Text mb={4}>Score: {inputValue}</Text>
              <HStack justifyContent="center">
                <Button onPress={cancelConfirmation} colorScheme="gray">
                  Cancel
                </Button>
                <Button onPress={handleConfirmation} colorScheme="red" ml={2}>
                  Submit
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
