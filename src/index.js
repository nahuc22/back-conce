const app = require('./server/server');
const connection = require('./db/connectionDb');


connection.on('connect', (err) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Conexión a la base de datos exitosa");
        app.listen(process.env.PORT, () => {
            console.log(`Servidor iniciado en http://localhost:${process.env.PORT}`);
        });
    }
});