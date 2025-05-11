const connection = require('../data/db');


function index(req, res) {

    const sql = 'SELECT * FROM movies;';

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                errorMessage: "Database connection error"
            });
        };

        res.json(results.map(result => ({
            ...result,
            imagePath: "http://127.0.0.1:3000/movies/" + result.image
        })));
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


        const currentResult = results[0];

        const movie = {
            ...currentResult,
            imagePath: "http://127.0.0.1:3000/movies/" + results.image
        }


        //recensioni

        const sql = "SELECT * FROM reviews WHERE movie_id = ?";

        connection.query(sql, [id], (err, results) => {

            if (err) {
                console.log(err)
            }

            movie.reviews = results;

            res.json(movie);
        });



    });
};

module.exports = { index, show };