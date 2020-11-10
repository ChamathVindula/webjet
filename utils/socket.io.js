const sessionKey = 'connect.sid';
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const passportSocketIo = require('passport.socketio');

class Socket {
    constructor(server, redisStore){
        this.io = socket(server);   
        this.io.use(passportSocketIo.authorize({
            cookieParser: cookieParser,
            key: sessionKey,
            secret: process.env.SESSIONSECRET,
            store: redisStore,
            success: this.onAuthorizeSuccess,
            fail: this.onAuthorizeFailure
        }));    
    }

    getIo(){
        return this.io;
    }

    onAuthorizeSuccess(data, accept){
        console.log('new socket connection established');
        accept(null, true);
    }

    onAuthorizeFailure(data, message, error, accept){
        if(error) throw error;
        console.log('failed connection to socket.io: ', message);
        accept(null, false);
    }
}

module.exports = Socket;
