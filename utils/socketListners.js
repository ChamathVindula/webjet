let io;
const redis = require('./redis.js');
const db = require('../models/index');
const redisClient = redis.createRedisClient();

module.exports = (socketio) => {
    io = socketio;
    io.on('connection', (socket) => {
        socket.on('disconnect', (reason) => {
            redisClient.del(socket.handshake.query.sender);
            console.log('user disconnected on socket ', socket.id);
        });
        redisClient.set(socket.handshake.query.sender, socket.id);
        console.log('new connection established with id: ', socket.id); 
        socket.on('chat message', handleIncommingMessage);
    });
}

async function handleIncommingMessage(message){
    let receiverAvailable = await redisGet(message.receiver);
    let connection = await checkConnectionAvailability([message.receiver, message.sender]);
    db.sequelize.transaction(t => {
        return Promise.all([
            db.Messages.create({ from: message.sender, to: message.receiver, connectionId: connection.id, message: message.message, status: 'unread' }, { transaction: t }),
            db.Connections.update(
                { lastActive: new Date() }, 
                { where: {
                        [db.Sequelize.Op.and]: [ 
                            { userLeft: { [db.Sequelize.Op.in]: [message.receiver, message.sender] }}, 
                            { userRight: { [db.Sequelize.Op.in]: [message.receiver, message.sender] }} 
                        ] 
                }},
                { transaction: t }
            )
        ])
    })
    .then(response => {
        if(receiverAvailable) io.to(receiverAvailable).emit('chat message', message);
    })
    .catch(err => {
        if(err) throw err;
    });
}

function redisGet(key){
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if(err) reject(err)
            if(value) resolve(value)
        });
    });
}

function checkConnectionAvailability(arr){
    return new Promise((resolve, reject) => {
        db.Connections.findOne({ attributes: ['id', 'status'], where: { 
            [db.Sequelize.Op.and]: [ 
                { userLeft: { [db.Sequelize.Op.in]: arr }}, 
                { userRight: { [db.Sequelize.Op.in]: arr }} 
            ] 
        }})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            if(err) reject(err);
        })
    });
}
