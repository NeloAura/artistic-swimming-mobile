import { io } from "socket.io-client";



class Ssocket{

    initializeSocket = async (SOCKET_IP) => {
        try {

            this.socket = io(`http://${SOCKET_IP}:3001`, {
                transports: ['websocket']
            })
            console.log("initializing socket", this.socket)

            this.socket.on('connect', (data) => {
                console.log("=== socket connected ====")
            })

            this.socket.on('disconnect', (data) => {
                console.log("=== socket disconnected ====")
            })

            this.socket.on('error', (data) => {
                console.log("socekt error", data)
            })
            
            
        } catch (error) {
            console.log("socket is not inialized", error)
        };

    }

    emit(event, data = {}) {
        this.socket.emit(event, data)
    };
    
    on(event, cb) {
        this.socket.on(event, cb)
    };

    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    };

}

const socket= new Ssocket();


export default socket;