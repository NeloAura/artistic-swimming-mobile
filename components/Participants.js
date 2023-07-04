import React, {useEffect, useState} from 'react';
import {
  Box,
  NativeBaseProvider,
  HStack,
  Text,
  Badge,
  Pressable,
} from 'native-base';
import {serverSecretCode} from './Home_QRCode';
import {ip} from './Home_QRCode';
import socket from '../utils/socket';

const fetchParticipants = async (judge, eventId) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit('fetch-judge-participants', {judge, eventId, serverSecretCode});
    socket.on('participantsAndTypeData', ({participants, eventType}) => {
      resolve({participants, eventType});
    });
    socket.on('connect_error', error => {
      reject(error);
      socket.removeListener();
    });
  });
};

const fetchGroups = async (eventId, judge) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit('fetch-judge-groups', {eventId, judge, serverSecretCode});
    socket.on('groupsAndTypeData', ({groups, eventType}) => {
      resolve({groups, eventType});
    });
    socket.on('connect_error', error => {
      reject(error);
      socket.removeListener();
    });
  });
};

export default function Participants({navigation, route}) {
  const [participantsData, setParticipantsData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [participantEventType, setParticipantEventType] = useState([]);
  const [groupEventType, setGroupEventType] = useState([]);
  const {eventId, judge , refreshKey, eventId2, judge2 } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {participants, eventType} = await fetchParticipants(
          judge,
          eventId,
        );
        setParticipantsData(participants);
        setParticipantEventType(eventType);
      } catch (error) {
        console.error('Error setting participants:', error);
      }
    };

    fetchData();
  }, [eventId , judge, eventId2, judge2 , refreshKey]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {groups, eventType} = await fetchGroups(eventId, judge);
        setGroupsData(groups);
        setGroupEventType(eventType);
      } catch (error) {
        console.error('Error setting groups:', error);
      }
    };

    fetchData();
  }, [eventId , judge, eventId2, judge2 ,refreshKey]);



  return (
    <NativeBaseProvider>
      {participantsData.length === 0 && groupsData.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Badge
            variant="solid"
            colorScheme="blue"
            p="10"
            mb="10"
            borderRadius="lg"
            borderWidth="5"
            borderColor="gray.400">
            There are currently no participants or groups to score.
          </Badge>
        </Box>
      ) : (
        <>
          <HStack flexWrap="wrap" justifyContent="center" space="4">
            {participantsData.map(oneParticipantData => (
              <Pressable
                key={oneParticipantData.id}
                pt="4"
                onPress={() => {
                  navigation.navigate('ScoreParticipant', {
                    eventId: eventId,
                    judge: judge,
                    participantId: oneParticipantData.id,
                    eventType: groupEventType,
                  });
                   // Call the refreshPage function after navigation
                }}>
                {({isHovered, isPressed}) => {
                  return (
                    <Box
                      maxW="196"
                      borderWidth="1"
                      borderColor="coolGray.300"
                      shadow="3"
                      bg={
                        isPressed
                          ? 'coolGray.200'
                          : isHovered
                          ? 'coolGray.200'
                          : 'coolGray.100'
                      }
                      p="5"
                      rounded="8"
                      style={{
                        transform: [
                          {
                            scale: isPressed ? 0.96 : 1,
                          },
                        ],
                      }}>
                      <HStack alignItems="center">
                        <Badge
                          colorScheme="darkBlue"
                          _text={{
                            color: 'white',
                          }}
                          variant="solid"
                          rounded="4">
                          {oneParticipantData.generatedNumber}
                        </Badge>
                      </HStack>
                      <Text
                        color="coolGray.800"
                        mt="3"
                        fontWeight="medium"
                        fontSize="xl">
                        {oneParticipantData.firstName}
                      </Text>
                      <Text mt="2" fontSize="sm" color="coolGray.700">
                        {oneParticipantData.country}
                      </Text>
                    </Box>
                  );
                }}
              </Pressable>
            ))}
          </HStack>

          <HStack flexWrap="wrap" justifyContent="center" space="4">
            {groupsData.map(oneGroupData => (
              <Pressable
                key={oneGroupData.id}
                pt="4"
                onPress={() => {
                  navigation.navigate('ScoreGroup', {
                    eventId: eventId,
                    judge: judge,
                    groupId: oneGroupData.id,
                    eventType: participantEventType,
                  });
                   // Call the refreshPage function after navigation
                }}>
                {({isHovered, isPressed}) => {
                  return (
                    <Box
                      maxW="196"
                      borderWidth="1"
                      borderColor="coolGray.300"
                      shadow="3"
                      bg={
                        isPressed
                          ? 'coolGray.200'
                          : isHovered
                          ? 'coolGray.200'
                          : 'coolGray.100'
                      }
                      p="5"
                      rounded="8"
                      style={{
                        transform: [
                          {
                            scale: isPressed ? 0.96 : 1,
                          },
                        ],
                      }}>
                      <HStack alignItems="center">
                        <Badge
                          colorScheme="purple"
                          _text={{
                            color: 'white',
                          }}
                          variant="solid"
                          rounded="4">
                          {oneGroupData.generatedNumber}
                        </Badge>
                      </HStack>
                      <Text
                        color="coolGray.800"
                        mt="3"
                        fontWeight="medium"
                        fontSize="xl">
                        {oneGroupData.groupName}
                      </Text>
                    </Box>
                  );
                }}
              </Pressable>
            ))}
          </HStack>
        </>
      )}
    </NativeBaseProvider>
  );
}
