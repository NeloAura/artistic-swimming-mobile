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
  Judge_1: undefined;
  Judge_2: undefined;
  Judge_3: undefined; // Added new screen here
};

type GroupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Judge_1'
>;

interface Props {
  navigation: GroupScreenNavigationProp;
}

export default function Home_Judge({navigation}: Props) {
  return (
    <NativeBaseProvider>
      <HStack flexWrap="wrap" justifyContent="center" space="4">
        <Pressable pt="4" onPress={() => navigation.navigate('Judge_1')}>
          {({isHovered, isFocused, isPressed}) => {
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
                    Badge 1
                  </Badge>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  Group 1
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  Group 1 description
                </Text>
                <Flex>
                  {isFocused ? (
                    <Text
                      mt="2"
                      fontSize={12}
                      fontWeight="medium"
                      textDecorationLine="underline"
                      color="darkBlue.600"
                      alignSelf="flex-start">
                      Read More
                    </Text>
                  ) : (
                    <Text
                      mt="2"
                      fontSize={12}
                      fontWeight="medium"
                      color="darkBlue.600">
                      Read More
                    </Text>
                  )}
                </Flex>
              </Box>
            );
          }}
        </Pressable>

        <Pressable pt="4" onPress={() => navigation.navigate('Judge_2')}>
          {({isHovered, isFocused, isPressed}) => {
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
                    Badge 2
                  </Badge>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  Group 2
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  Group 2 description
                </Text>
                <Flex>
                  {isFocused ? (
                    <Text
                      mt="2"
                      fontSize={12}
                      fontWeight="medium"
                      textDecorationLine="underline"
                      color="darkBlue.600"
                      alignSelf="flex-start">
                      Read More
                    </Text>
                  ) : (
                    <Text
                      mt="2"
                      fontSize={12}
                      fontWeight="medium"
                      color="darkBlue.600">
                      Read More
                    </Text>
                  )}
                </Flex>
              </Box>
            );
          }}
        </Pressable>

        <Pressable pt="4" pb="4" onPress={() => navigation.navigate('Judge_3')}>
          {({isHovered, isFocused, isPressed}) => {
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
                    Badge 3
                  </Badge>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  Group 3
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  Group 3 description
                </Text>
                <Flex>
                  {isFocused ? (
                    <Text
                      mt="2"
                      fontSize={12}
                      fontWeight="medium"
                      textDecorationLine="underline"
                      color="darkBlue.600"
                      alignSelf="flex-start">
                      Read More
                    </Text>
                  ) : (
                    <Text
                      mt="2"
                      fontSize={12}
                      fontWeight="medium"
                      color="darkBlue.600">
                      Read More
                    </Text>
                  )}
                </Flex>
              </Box>
            );
          }}
        </Pressable>
      </HStack>
    </NativeBaseProvider>
  );
}
