const Connection = require('tedious').Connection;  

var config = {  
    server: `NAHU\\NAHUEL`,
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'P@ssword!Strong'
        }
    },
    options: {
        encrypt: false,
        database: 'conceweb',
        
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
