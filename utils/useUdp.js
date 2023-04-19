import dgram from 'react-native-udp';

const routerIp = '192.168.1.255';
const UDPPORT = 3010;

const udpClient = dgram.createSocket('udp4');

udpClient.bind(UDPPORT, () => {
  console.log(`Client socket bound to port ${UDPPORT}`);
});
const getServerIpAddress = () => {
  return new Promise((resolve, reject) => {
    udpClient.on('message', (message, rinfo) => {
      console.log('Received message:', message.toString(), 'from', rinfo.address);
      const msg = message.toString();
      
      // If the message is a response to the IP address request, extract the IP address and use it
      if (msg.startsWith('server-ip-address:')) {
        const ip = msg.split(':')[1];
        
        console.log(`Server IP address: ${ip}`);
        resolve(ip);
        udpClient.close(); // Close the socket
      }
    });

    udpClient.send('request-ip-address', 0, 18, UDPPORT, routerIp);
  });
};

export default getServerIpAddress;
