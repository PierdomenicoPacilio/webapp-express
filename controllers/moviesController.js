const connection = require('../data/db');


function index(req, res) {

    const sql = 'SELECT * FROM movies;';

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                errorMessage: "Database connection error"
            });
        };

        res.json(results);
    });
};

function show(req, res) {

    const { id } = req.params;

    const sql = 'SELECT * FROM movies WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                errorMessage: "Database connection error"
            });
        };
        if (results.length === 0) {
            return res.status(404).json({
                errorMessage: "No records found"
            });
        };
        res.json(results[0]);
    });
};

module.exports = { index, show };