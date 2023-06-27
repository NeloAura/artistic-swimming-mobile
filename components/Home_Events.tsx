import React, { useEffect } from 'react';
import {
  Box,
  NativeBaseProvider,
  HStack,
  Text,
  Badge,
  Pressable,
} from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import {serverSecretCode} from './Home_QRCode.tsx';
import { ip } from './Home_QRCode.tsx';
import socket from "../utils/socket";


type RootStackParamList = {
  Participants: undefined; // Added new screen here
};

type GroupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Participants'
>;

interface Props {
  navigation: GroupScreenNavigationProp;
}

const fetchEvent = async (judge:any) => {
  
  return new Promise((resolve, reject) => {
    socket.emit("fetch-judge-events", judge); // Pass the converted competition ID to the server
    socket.on("judgeEvents", (judges:any) => {
      resolve(judges);
    });
    socket.on("connect_error", (error:any) => {
      reject(error);
    });
  });
};

export default function Home_Events({ navigation }: Props) {
  const [events, setEvents] = React.useState([]);
  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventsData = await fetchEvent(judge);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error setting events:", error);
      }
    };

    fetchEventData();
  }, [judge]);

  return (
    <NativeBaseProvider>
      <HStack flexWrap="wrap" justifyContent="center" space="4">
        {events.map((event:any) => (
          <Pressable
            key={event.id}
            pt="4"
            onPress={() => navigation.navigate('Participants')}>
            {({ isHovered, isPressed }) => {
              return (
                <Box
                  maxW="96"
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
                      {event.id}
                    </Badge>
                  </HStack>
                  <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    {event.name}
                  </Text>
                  <Text mt="2" fontSize="sm" color="coolGray.700">
                    {event.type}
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
