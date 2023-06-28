import React, { useEffect } from 'react';
import {
  Box,
  NativeBaseProvider,
  HStack,
  Text,
  Badge,
  Pressable,
} from 'native-base';
import {serverSecretCode} from './Home_QRCode';
import { ip } from './Home_QRCode';
import socket from "../utils/socket";





const fetchParticipants = async (eventId , judge) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit("fetch-judge-participants",{judge,eventId ,serverSecretCode});
    socket.on("participantsAndTypeData", (participants) => {
      resolve(participants);
    });
    socket.on("connect_error", (error) => {
      reject(error);
      socket.removeListener();
    });
  });
};

const fetchGroups = async (eventId , judge) => {
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit("fetch-judge-groups",{judge,eventId ,serverSecretCode});
    socket.on("groupsAndTypeData", (groups) => {
      resolve(groups);
    });
    socket.on("connect_error", (error) => {
      reject(error);
      socket.removeListener();
    });
  });
};


export default function Participants({ navigation, route }) {
  const [participantsData, setParticipantsData] = React.useState([]);
  const [GroupsData, setGroupsData] = React.useState([]);
  const { eventId, judge } = route.params;

  useEffect(() => {
    const fetchParticipantsData = async () => {
      try {
        const participantsData = await fetchParticipants(judge,eventId);
        setParticipantsData(participantsData);
      } catch (error) {
        console.error("Error setting participants:", error);
      }
    };

    fetchParticipantsData();
  }, []);

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const GroupsData = await fetchGroups(judge,eventId);
        setGroupsData(GroupsData);
      } catch (error) {
        console.error("Error setting groups:", error);
      }
    };

    fetchGroupsData();
  }, []);

 
  return (
    <NativeBaseProvider>
      <HStack flexWrap="wrap" justifyContent="center" space="4">
        {participantsData.map((oneParticipantData) => (
          <Pressable
            key={oneParticipantData.participant.id}
            pt="4"
            onPress={() => navigation.navigate('ScoreParticipant', {eventId: eventId, judge: judge, participantId: oneParticipantData.participant.id})}>
            {({ isHovered, isPressed }) => {
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
                      {oneParticipantData.participant.id}
                    </Badge>
                  </HStack>
                  <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    {oneParticipantData.participant.firstName}
                  </Text>
                  <Text mt="2" fontSize="sm" color="coolGray.700">
                    {oneParticipantData.participant.generatedNumber}
                  </Text>
                </Box>
              );
            }}
          </Pressable>
        ))}
      </HStack>

      <HStack flexWrap="wrap" justifyContent="center" space="4">
        {GroupsData.map((oneGroupData) => (
          <Pressable
            key={oneGroupData.group.id}
            pt="4"
            onPress={() => navigation.navigate('ScoreGroup', {eventId: eventId, judge: judge, groupId: oneGroupData.group.id})}>
            {({ isHovered, isPressed }) => {
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
                      {oneGroupData.group.id}
                    </Badge>
                  </HStack>
                  <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    {oneGroupData.group.groupName}
                  </Text>
                  <Text mt="2" fontSize="sm" color="coolGray.700">
                    {oneGroupData.group.generatedNumber}
                  </Text>
                </Box>
              );
            }}
          </Pressable>
        ))}
      </HStack>
    </NativeBaseProvider>
  );
}
