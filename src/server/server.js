const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
const isAuthenticated = require('../middleware/AuthMiddleware.js');

const indexRoutes = require('../routes/index.js');

const app = express();
const secret = crypto.randomBytes(64).toString('hex');

dotenv.config();

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Solo en desarrollo, en producción debe ser true
        httpOnly: true,
        sameSite: 'strict' // Ajusta según el contexto
    }
}));

app.use(express.json());
app.use(bodyParser.json());

// Configura CORS
const corsOptions = {
    origin: `http://${process.env.LOCALHOST}:8080`, // Especifica el origen permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true // Permitir el envío de cookies y encabezados de autorización
};
app.use(cors(corsOptions));


app.use('/api', indexRoutes);


app.use("/", (req,res) => {
    res.send("Hola")
});

app.use(express.static(path.join(__dirname, 'public')));


// Rutas para servir archivos estáticos
app.get('/student-dashboard.html', isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard', 'student-dashboard.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.js'));
});

module.exports = app;