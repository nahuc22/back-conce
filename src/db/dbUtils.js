const { Request, TYPES} = require('tedious');
const connection = require('./connectionDb');

function executeStatement(query, parameters, callback) {
    if (typeof callback !== 'function') {
        throw new TypeError('El callback debe ser una función');
    }

    const request = new Request(query, (err, rowCount) => {
        if (err) {
            return callback(err, null);
        }
    });

    // Añadir parámetros a la solicitud
    Object.keys(parameters).forEach(paramName => {
        const paramValue = parameters[paramName];
        request.addParameter(paramName, TYPES.VarChar, paramValue);
    });

    let result = [];
    request.on('row', (columns) => {
        let row = {};
        columns.forEach(column => {
            row[column.metadata.colName] = column.value;
        });
        result.push(row);
    });

    request.on('requestCompleted', () => {
        callback(null, result);
    });

    connection.execSql(request);
}

module.exports = executeStatement;