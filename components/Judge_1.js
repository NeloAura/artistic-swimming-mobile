import React from 'react';
import {
  VStack,
  Box,
  NativeBaseProvider,
  FormControl,
  Input,
  WarningOutlineIcon,
  Button,
} from 'native-base';



export default function Judge_1() {
  const [formData, setData] = React.useState<FormData>({});

  const onSubmit = () => {
    console.log('Submitted', formData.score);
    setData({ score: undefined });
  };

  return (
    <NativeBaseProvider>
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
              onChangeText={value => setData({...formData, score: Number(value)})}
              value={formData.score?.toString()}
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
