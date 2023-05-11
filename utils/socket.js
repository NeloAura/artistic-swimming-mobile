import { io } from "socket.io-client";
import serverIpAddress from "../components/Home_QRCode.tsx"
const socket = io.connect(`http://${serverIpAddress}:3001`);


















export default socket;