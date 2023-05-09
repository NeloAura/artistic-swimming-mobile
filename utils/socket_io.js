import io from 'socket.io-client';
import { serverIpAddress } from  '../components/Home_QRCode.js';

const PROTOCOL = "http:";
const DOMAIN  = serverIpAddress;
const PORT = ":3001";

const socket = io(`${PROTOCOL}//${DOMAIN}${PORT}`);

function socket_emit(event, data) {
  return  socket.emit(event, data, );
}

function socket_on(eventName, callback) {
  socket.on(eventName, (data) => {
    console.log(data);
    callback(data);
  });
}

export { socket_emit , socket_on ,socket}