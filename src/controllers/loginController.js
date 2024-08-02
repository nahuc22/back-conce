const { verifyLogin, createPassword, checkPasswordDni, checkActiveStatus } = require('../queries/login');

// Maneja la solicitud de login
function handleLogin(req, res) {
    const { dni, password, type } = req.body || {};

    if (!dni || !password || !type) {
        return res.status(400).send("Faltan campos requeridos");
    }
    
    verifyLogin(dni, password, type, (err, result) => {
        if (err) {
            return res.status(500).send("Error al verificar el login");
        }
        console.log(result);
        if (result.success) {
            req.session.userId = dni;
            req.session.userName = result.name;
            if (req.session && req.session.userId) {
                return res.json({
                    success: true,
                    message: "Login exitoso",
                    type: result.type,
                    isAuthenticated: true,
                });
            } else {
                console.log('Error en la configuración de la sesión después del login.');
                return res.json({
                    success: false,
                    message: "Error en la configuración de la sesión después del login."
                });
            }
        } else {
            return res.json({
                success: false,
                message: "Credenciales incorrectas"
            });
        }
    });
}

// Maneja la solicitud de verificación de autenticación
const handleCheckAuth = (req, res) => {
    if (req.session && req.session.userId) {
        const name = req.session.userName;
        res.json({ isAuthenticated: true, dni: req.session.userId, name: name });
    } else {
        res.json({ isAuthenticated: false });
    }
};

// Maneja la solicitud de verificación del estado activo
const handleCheckStatus = (req, res) => {
    const dni = req.params.dni;

    checkActiveStatus(dni, (err, isActive) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ isActive });
    });
};

// Maneja la solicitud de creación de una nueva contraseña
const handleCreatePassword = (req, res) => {
    const { dni, newPassword, type } = req.body;

    if (!dni || !newPassword || !type) {
        return res.status(400).send("Faltan campos requeridos");
    }

    createPassword(dni, newPassword, type, (err, result) => {
        if (err) {
            return res.status(500).send("Error al crear la contraseña");
        }

        res.json({ message: result.message });
    });
};

// Maneja la solicitud de verificación de la contraseña
const handleCheckPassword = (req, res) => {
    const dni = req.params.dni;
    const type = req.query.type;

    if (!dni || !type) {
        return res.status(400).send("Faltan campos requeridos");
    }

    checkPasswordDni(dni, type, (err, result) => {
        if (err) {
            return res.status(500).send("Error en la consulta de la base de datos");
        }

        res.json({
            access: result.access,
            hasPassword: result.hasPassword,
            message: result.message,
            data: result.data,
            type: result.type
        });
    });
};

module.exports = {
    handleLogin,
    handleCheckAuth,
    handleCheckStatus,
    handleCreatePassword,
    handleCheckPassword
};