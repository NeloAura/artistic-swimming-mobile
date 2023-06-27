import React from 'react';
import {
  Box,
  NativeBaseProvider,
  HStack,
  Text,
  Badge,
  Flex,
  Pressable,
} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';


type RootStackParamList = {
  Participant_1: undefined;
  Participant_2: undefined; // Added new screen here
};

type GroupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Participant_1'
>;

interface Props {
  navigation: GroupScreenNavigationProp;
}

export default function Home_Judge({navigation}: Props) {

  



  return (
    <NativeBaseProvider>
     
      <HStack flexWrap="wrap" justifyContent="center" space="4">
        <Pressable pt="4" onPress={() => navigation.navigate('Participant_2')}>
          {({isHovered, isPressed}) => {
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
                    1
                  </Badge>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  Event 1
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  Event 1 description
                </Text>
              </Box>
            );
          }}
        </Pressable>

        <Pressable pt="4" onPress={() => navigation.navigate('Participant_2')}>
          {({isHovered, isPressed}) => {
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
                    2
                  </Badge>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  Event 2
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  Event 2 description
                </Text>
              </Box>
            );
          }}
        </Pressable>

        <Pressable pt="4" pb="4" onPress={() => navigation.navigate('Participant_2')}>
          {({isHovered, isPressed}) => {
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
                    3
                  </Badge>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  Event 3
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  Event 3 description
                </Text>
              </Box>
            );
          }}
        </Pressable>
      </HStack>
    </NativeBaseProvider>
  );
}
