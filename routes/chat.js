const express = require('express');
const ensurelogin = require('connect-ensure-login');
const chatController = require('../controllers/chat');

const Router = express.Router();

Router.get('/chat', ensurelogin.ensureLoggedIn('/'), chatController.chatInit);

module.exports = Router;