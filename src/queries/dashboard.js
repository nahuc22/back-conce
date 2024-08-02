const executeStatement = require('../db/dbUtils');

function formatDate(date) {
    if (!date) return null; // Manejar posibles valores nulos
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDates(callback) {
    const query = `
        SELECT TOP 1
            [Fee11Par1D] AS firstQuarterStart, [Fee11Par1H] AS firstQuarterEnd,
            [Fee11Par2D] AS secondQuarterStart, [Fee11Par2H] AS secondQuarterEnd,
            [Fee11Par3D] AS thirdQuarterStart, [Fee11Par3H] AS thirdQuarterEnd,
            [Fee111D] AS firstDeliveryStart, [Fee111H] AS firstDeliveryEnd,
            [Fee112D] AS secondDeliveryStart, [Fee112H] AS secondDeliveryEnd,
            [Fee113D] AS thirdDeliveryStart, [Fee113H] AS thirdDeliveryEnd
        FROM MODE11
    `;
    
    executeStatement(query, {}, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        
        if (result.length > 0) {
            const row = result[0];
            const formattedResult = {
                trimestreDates: {
                    firstQuarterStart: formatDate(row.firstQuarterStart),
                    firstQuarterEnd: formatDate(row.firstQuarterEnd),
                    secondQuarterStart: formatDate(row.secondQuarterStart),
                    secondQuarterEnd: formatDate(row.secondQuarterEnd),
                    thirdQuarterStart: formatDate(row.thirdQuarterStart),
                    thirdQuarterEnd: formatDate(row.thirdQuarterEnd),
                },
                libretaDates: {
                    firstDeliveryStart: formatDate(row.firstDeliveryStart),
                    firstDeliveryEnd: formatDate(row.firstDeliveryEnd),
                    secondDeliveryStart: formatDate(row.secondDeliveryStart),
                    secondDeliveryEnd: formatDate(row.secondDeliveryEnd),
                    thirdDeliveryStart: formatDate(row.thirdDeliveryStart),
                    thirdDeliveryEnd: formatDate(row.thirdDeliveryEnd),
                }
            };
            callback(null, formattedResult);
        } else {
            callback(null, { trimestreDates: {}, libretaDates: {} }); // Estructura vacía si no hay resultados
        }
    });
}

module.exports = { getDates };
