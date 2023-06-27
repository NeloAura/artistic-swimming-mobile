import React from 'react';
import {
  Box,
  NativeBaseProvider,
  HStack,
  Text,
  Badge,
  Pressable,
} from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home_Events: { judge: string }; // Update parameter type for Home_Events
  Participants: undefined; // Added new screen here
};

type GroupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Participants'
>;

interface Props {
  navigation: GroupScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Home_Events'>;
}

export default function Home_Events({ navigation, route }: Props) {
  const events = [
    {
      id: 1,
      name: 'Event 1',
      description: 'Event 1 description',
    },
    {
      id: 2,
      name: 'Event 2',
      description: 'Event 2 description',
    },
    {
      id: 3,
      name: 'Event 3',
      description: 'Event 3 description',
    },
    {
      id: 4,
      name: 'Event 4',
      description: 'Event 4 description',
    },
    // Add more events as needed
  ];

  const { judge } = route.params;

  console.log('username: ', judge);

  return (
    <NativeBaseProvider>
      <HStack flexWrap="wrap" justifyContent="center" space="4">
        {events.map((event) => (
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
                    {event.description}
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
