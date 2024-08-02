const { getDates } = require('../queries/dashboard')

const handleGetDates = (req, res) => {
    getDates((err, dates) => {
        if (err) {
            console.error('Error al obtener las fechas:', err);
            return res.status(500).send('Error al obtener las fechas');
        }
        res.json(dates);
    });
}

module.exports = { handleGetDates };