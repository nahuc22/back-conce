require('dotenv').config();
const { Connection } = require('tedious');

const config = {  
    server: process.env.DB_SERVER,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        encrypt: false,
        database: process.env.DB_NAME
    }
};  

const connection = new Connection(config);

connection.connect();

connection.on('connect', function(err) {  
    if(err) {
        console.log("Error", err);
    }
});

module.exports = connection;
