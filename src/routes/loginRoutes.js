const express = require('express');
const loginRoutes = express.Router();
const {
    handleLogin,
    handleCheckAuth,
    handleCheckStatus,
    handleCreatePassword,
    handleCheckPassword
} = require('../controllers/loginController');

// Ruta para login
loginRoutes.post('/', handleLogin);

// Ruta para verificar autenticación
loginRoutes.get('/check-auth', handleCheckAuth);

// Ruta para verificar el estado activo
loginRoutes.get('/checkstatus/:dni', handleCheckStatus);

// Ruta para crear una nueva contraseña
loginRoutes.post('/create-password', handleCreatePassword);

// Ruta para verificar la contraseña
loginRoutes.get('/check-password/:dni', handleCheckPassword);

module.exports = loginRoutes;
