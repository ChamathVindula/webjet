const db = require('../models/index');

module.exports.chatInit = (req, res, next) => {
   let clients = [];
   db.Connections.findAll({ 
       attributes: [`id`, `userLeft`, `userRight`, `status`, `createdAt`, `updatedAt`], 
       where: { 
           [db.Sequelize.Op.or]: [
               { userLeft: req.user.id }, 
               { userRight: req.user.id }
            ] 
        },
        order: [['lastActive', 'ASC']] 
    })
    .then(connections => {
        let count = connections.length;
        // res.render('chat.ejs', { user: req.user, clientList: clients });
        for(let i = 0; i < count; i++){
            if(connections[i].userLeft === req.user.id) clients.push(connections[i].userRight)
            else clients.push(connections[i].userLeft);
        }
        return db.GoogleUsers.findAll({ where: { id: {[db.Sequelize.Op.in]: clients} } })
        .then(users => {
            return { connections: connections, clients: clients }
        });
    })
    .then(object => {
        // todo
    })
    .catch(err => {
        if(err) throw err;
    });
}