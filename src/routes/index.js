const express = require('express');
const router = express.Router();

// Importar rutas de los diferentes módulos
const loginRoutes = require('./loginRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// Usar rutas
router.use('/login', loginRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;