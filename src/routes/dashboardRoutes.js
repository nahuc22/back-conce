const express = require('express');
const dashboardRoutes = express.Router();
const {
    handleGetDates
} = require('../controllers/dashboardController');

dashboardRoutes.get('/getdates', handleGetDates)

module.exports = dashboardRoutes;