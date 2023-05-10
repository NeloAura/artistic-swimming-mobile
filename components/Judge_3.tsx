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
} from 'native-base';

export default function Judge_3() {
  const [formData, setData] = React.useState({});

  const onSubmit = () => {
    console.log('Submitted');
  };

  return (
    <NativeBaseProvider>
      <Box alignItems="center" pt="4">
        <Box //Top Card
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
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
          <Stack //Textbox
            p="4"
            space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                Lorem Ipsum
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
                Old Reliable
              </Text>
            </Stack>
            <Text fontWeight="400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla
              facilisi morbi tempus iaculis.
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between">
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="400">
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>

      <Box //Form & Button
        alignItems="center">
        <VStack>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Score
            </FormControl.Label>
            <Input
              keyboardType="numeric"
              maxLength={2}
              placeholder="0-10"
              onChangeText={value => setData({...formData, name: value})}
              width="20%"
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
    </NativeBaseProvider>
  );
}
