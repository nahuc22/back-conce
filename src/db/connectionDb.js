const Connection = require('tedious').Connection;  
require('dotenv').config();


var config = {  
    server: `${process.env.DB_SERVER}`,
    authentication: {
        type: 'default',
        options: {
            userName: `${process.env.DB_USER}`,
            password: `${process.env.DB_PASSWORD}`
        }
    },
    options: {
        encrypt: false,
        database: `${process.env.DB_NAME}`,
        
    }
};  
var connection = new Connection(config); 

connection.connect();

connection.on('connect', function(err) {  
    if(err) {
        console.log("Error", err);
    }

});

module.exports = connection;
