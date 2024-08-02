const app = require('./server/server');
const connection = require('./db/connectionDb');

const port = 3000;

connection.on('connect', (err) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Conexión a la base de datos exitosa");
        app.listen(port, () => {
            console.log(`Servidor iniciado en http://localhost:${process.env.PORT}`);
        });
    }
});