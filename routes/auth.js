const express = require('express')
const {registerUser, loginUser, forgotPassword, resetPassword, socialAuth} = require('../controllers/auth')
const routes = express.Router();

routes.route('/register').post(registerUser);
routes.route('/login').post(loginUser);
routes.route('/forgot-password').post(forgotPassword)
routes.route('/reset-password').post(resetPassword)
routes.route('/social').post(socialAuth)


module.exports = routes;