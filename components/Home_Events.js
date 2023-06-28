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





const fetchEvent = async (judge) => {
  
  return new Promise((resolve, reject) => {
    socket.initializeSocket(ip);
    socket.emit("fetch-judge-events", {judge , serverSecretCode}); // Pass the converted competition ID to the server
    socket.on("judgeEvents", (events) => {
      resolve(events);
    });
    socket.on("connect_error", (error) => {
      reject(error);
    });
  });
};

export default function Home_Events({ navigation, route }) {
  const [events, setEvents] = React.useState([]);
  const { judge } = route.params;
  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventsData = await fetchEvent(judge);
        console.log('Fetched events data:', eventsData);
        // Extract the events array from eventsData
        const extractedEvents = eventsData?.events || [];

        setEvents(extractedEvents);
        
      } catch (error) {
        console.error("Error setting events:", error);
      }
    };

    fetchEventData();
  }, [judge]);


  console.log('username: ', judge);

  return (
    <NativeBaseProvider>
      <HStack flexWrap="wrap" justifyContent="center" space="4">
        {events.map((event) => (
          <Pressable
            key={event.id}
            pt="4"
            onPress={() => navigation.navigate('Participants', { eventId: event.id, judge: judge })}>
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
                      {`Time: ${event.startTime}-${event.endTime}`}
                    </Badge>
                  </HStack>
                  <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    {event.name}
                  </Text>
                  
                  <Badge
                      colorScheme="lightBlue"
                      _text={{
                        color: 'white',
                      }}
                      variant="solid"
                      rounded="2">
                      {event.type}
                  </Badge>
                </Box>
              );
            }}
          </Pressable>
        ))}
      </HStack>
    </NativeBaseProvider>
  );
}
