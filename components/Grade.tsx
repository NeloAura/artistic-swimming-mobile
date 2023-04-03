import React from 'react';
import {
  Text,
  List,
  Container,
  Switch,
  Icon,
  Button,
  CheckCircleIcon,
  NativeBaseProvider,
} from 'native-base';

const Grade = () => (
    <NativeBaseProvider>
  <List
    bg="twitter.300"
    flexDirection="column"
    borderWidth={2}
    borderColor="black"
    rounded="md"
    p={3}
  >
    <Text
      bg="whiteAlpha.900"
      fontWeight="bold"
      lineHeight={10}
      
      textAlign="center"
      p={2}
    >
      Participants
    </Text>
    <Container mt={5} mb={5}>
      <Container
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        mt={5}
        mb={5}
        pt={5}
        pb={5}
        width={500}
      >
        <Button
          bg="transparent"
          borderWidth={2}
          borderRadius={999}
          size="lg"
          _text={{ fontSize: 'md' }}
        >
          #54
        </Button>
        <Text
          bg="gray.500"
          borderRadius={45}
          textAlign="center"
          p={2}
          color="whiteAlpha.900"
          width={200}
        >
          Jeanello Haddocks
        </Text>
        <Switch colorScheme="danger" size="md" />
      </Container>
      <Container
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        mt={5}
        mb={5}
        pt={5}
        pb={5}
        width={500}
      >
        <Button
          bg="transparent"
          borderWidth={2}
          borderRadius={999}
          size="lg"
          _text={{ fontSize: 'md' }}
        >
          #58
        </Button>
        <Text
          bg="gray.500"
          borderRadius={45}
          textAlign="center"
          p={2}
          color="whiteAlpha.900"
          width={200}
        >
          Kevin Naranjo Silva
        </Text>
        <Switch colorScheme="danger" size="md" />
      </Container>
      <Container
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        mt={5}
        mb={5}
        pt={5}
        pb={5}
        width={500}
      >
        <Button
          bg="transparent"
          borderWidth={2}
          borderRadius={999}
          size="lg"
          _text={{ fontSize: 'md' }}
        >
          #17
        </Button>
        <Text
          bg="gray.500"
          borderRadius={45}
          textAlign="center"
          p={2}
          color="whiteAlpha.900"
          width={200}
        >
          Jonathan Libier
        </Text>
        <Switch colorScheme="danger" size="md" />
      </Container>
    </Container>
    <Button
      bg="transparent"
      alignSelf="center"
      mt={3}
      onPress={() => {}}
    >
      <Icon
        as={<CheckCircleIcon></CheckCircleIcon>}
        size="sm"
        color="black"
      />
    </Button>
  </List>
  </NativeBaseProvider>
);

export default Grade;
