import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SERVER_PORT = 3000; // Replace with your server port

const useSocket = () => {
  const [serverIPAddress, setServerIPAddress] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the server socket
    const newSocket = io(`http://SERVER_IP_ADDRESS:${SERVER_PORT}`);

    newSocket.on('serverIPAddress', (data) => {
      // Set the server IP address in state
      setServerIPAddress(data);
    });

    // Save the socket object in state
    setSocket(newSocket);

    // Cleanup the socket on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Connect to the server socket when the serverIPAddress state is set
    if (serverIPAddress) {
      const newSocket = io(`http://${serverIPAddress}:${SERVER_PORT}`);

      // Save the socket object in state
      setSocket(newSocket);

      // Cleanup the socket on unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, [serverIPAddress]);

  return socket;
};

export default useSocket;
