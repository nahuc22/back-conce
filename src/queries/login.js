const executeStatement = require('../db/dbUtils')


function verifyLogin(dni, password, type, callback) {
    const query = `SELECT Nr35, nr35web, nr35webalu, nm35 FROM MOD35 WHERE Nr35 = @dni`;
    
    executeStatement(query, { dni }, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        if (result.length > 0) {
            const user = result[0];
            const storedPasswordParent = user.nr35web;
            const storedPasswordStudent = user.nr35webalu;
            const name = user.nm35.trim()
            
            if (type === 'parent' && storedPasswordParent === password) {
                return callback(null, { success: true, message: "Logueo exitoso como padre!", type: type, isAuthenticated: true, name: name });
            } else if (type === 'student' && storedPasswordStudent === password) {
                return callback(null, { success: true, message: "Logueo exitoso como alumno!", type: type, isAuthenticated: true, name: name });
            } else {
                return callback(null, { success: false, message: "Contraseña incorrecta.", type: type });
            }
        } else {
            return callback(null, { success: false, message: "Usuario no encontrado.", type: type });
        }
    });
}
function checkActiveStatus(dni, callback) {
    const query = `SELECT Ye42 FROM MOD42 WHERE Nr42 = @dni`;

    executeStatement(query, { dni }, (err, result) => {
        if (err) {
            console.error('Error en la consulta de estado activo:', err);
            return callback(err, null);
        }

        console.log('Resultado de la consulta de estado activo:', result);

        if (result.length > 0) {
            const user = result[0];
            const currentYear = new Date().getFullYear();
            const isActive = user.Ye42 === currentYear;  // Verificar si Ye42 es igual al año actual
            return callback(null, isActive);
        } else {
            return callback(null, false); // DNI no encontrado en MOD42
        }
    });
}

function createPassword(dni, newPassword, type, callback) {
    let query = '';

    if (type === 'student') {
        query = `UPDATE MOD35 SET nr35webalu = @newPassword WHERE nr35 = @dni`;
    } else if (type === 'parent') {
        query = `UPDATE MOD35 SET nr35web = @newPassword WHERE nr35 = @dni`;
    } else {
        return callback(new Error("Tipo de usuario inválido"), null);
    }

    executeStatement(query, { dni, newPassword }, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, { message: "Contraseña creada con éxito" });
    });
}

function checkPasswordDni(dni, type, callback) {
    console.log('DNI recibido para verificación:', dni);
    console.log('Tipo recibido para verificación:', type);

    // Define la columna a consultar según el tipo
    const column = type === 'parent' ? 'nr35web' : (type === 'student' ? 'nr35webalu' : null);

    if (!column) {
        return callback(new Error('Tipo inválido'), null);
    }

    const query = `SELECT ${column} FROM MOD35 WHERE nr35 = @dni`;

    executeStatement(query, { dni }, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return callback(err, null);
        }

        console.log('Resultado de la consulta:', result);

        let access = false;
        let hasPassword = false;
        let data = false;
        let message = '';

        if (result.length > 0) {
            const user = result[0];
            const password = user[column];

            // Imprime el valor para depuración
            console.log(`Valor de ${column}:`, password);

            access = true; // El DNI existe en la base de datos
            if (password === undefined || password === null || password.trim() === '') {
                hasPassword = false; // No tiene contraseña definida
                message = "El DNI existe pero no tiene contraseña definida.";
            } else {
                hasPassword = true; // Tiene una contraseña definida
                data = password;
                message = "El DNI existe y tiene una contraseña definida.";
            }
            
        } else {
            message = "DNI no encontrado."; // DNI no existe en la base de datos
        }

        // Devuelve el objeto con la propiedad `access` y otros detalles
        return callback(null, { access, hasPassword, message, data, type });
    });
}
module.exports = {verifyLogin , createPassword , checkPasswordDni , checkActiveStatus};
