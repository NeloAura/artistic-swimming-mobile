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

type RootStackParamList = {
  Score: undefined; // Added new screen here
};

type GroupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Score'
>;

interface Props {
  navigation: GroupScreenNavigationProp;
}

export default function Participants({ navigation }: Props) {
  const participants = [
    {
      id: 10,
      name: 'Participant 1',
      description: 'Participant 1 description',
    },
    {
      id: 22,
      name: 'Participant 2',
      description: 'Participant 2 description',
    },
    {
      id: 35,
      name: 'Group 3',
      description: 'Group 3 description',
    },
    {
      id: 45,
      name: 'Group 4',
      description: 'Group 4 description',
    },
    // Add more participants as needed
  ];

  return (
    <NativeBaseProvider>
      <HStack flexWrap="wrap" justifyContent="center" space="4">
        {participants.map((participant) => (
          <Pressable
            key={participant.id}
            pt="4"
            onPress={() => navigation.navigate('Score')}>
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
                      {participant.id}
                    </Badge>
                  </HStack>
                  <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    {participant.name}
                  </Text>
                  <Text mt="2" fontSize="sm" color="coolGray.700">
                    {participant.description}
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
