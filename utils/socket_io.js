import io from 'socket.io-client';
import { serverIpAddress } from  '../components/Home_QRCode.tsx';

const PROTOCOL = "http:";
const DOMAIN  = serverIpAddress;
const PORT = ":3001";

const socket = io(`${PROTOCOL}//${DOMAIN}${PORT}`);

function socket_emit(event, data) {
  return new Promise((resolve, reject) => {
    socket.emit(event, data, (response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response.data);
      }
    });
  });
}

export { socket_emit , socket };
