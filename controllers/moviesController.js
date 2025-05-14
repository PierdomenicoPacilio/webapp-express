const connection = require('../data/db');


function index(req, res) {

    const { search } = req.query;

    const preparedParams = [];

    let sql = `
    SELECT 
        movies.*, ROUND(AVG(reviews.vote), 1) AS reviews_vote
    FROM 
        movies 
    LEFT JOIN 
        reviews ON movies.id = reviews.movie_id
    `;
    if (search) {
        sql += `
    WHERE 
        title LIKE ? or director LIKE ? or abstract LIKE ?`;
        preparedParams.push(`%${search}%`, `%${search}%`, `%${search}%`)
    }
    sql += `
    GROUP BY 
        movies.id;
    `;


    connection.query(sql, preparedParams, (err, results) => {
        if (err) {
            return res.status(500).json({
                errorMessage: "Database connection error"
            });
        };

        res.json(results.map(result => ({
            ...result,
            imagePath: "http://127.0.0.1:3000/movies_cover/" + result.image
        })));
    });
};

function show(req, res) {

    const { id } = req.params;

    const sql = `
    SELECT 
        movies.*, ROUND(AVG(reviews.vote), 1) AS reviews_vote
    FROM 
        movies 
    LEFT JOIN 
        reviews ON movies.id = reviews.movie_id
    WHERE
        movies.id = ?
    `;

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
            imagePath: "http://127.0.0.1:3000/movies_cover/" + currentResult.image
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

function storeReview(req, res) {

    const { id } = req.params;

    const { name, vote, text } = req.body;

    const sql = `INSERT INTO reviews (movie_id, name, vote, text)
                VALUES ( ?, ?, ?, ? );`;

    connection.query(sql, [id, name, vote, text], (err, results) => {
        if (err) {
            console.log(err);
        };
    });

    res.status(201);
    res.json({
        id,
        name,
        vote,
        text
    });
};

function store(req, res) {

    const { title, director, genre, release_year, abstract, slug } = req.body;

    const imageName = req.file.filename;

    const sql = `INSERT INTO movies (title, director, genre, release_year, abstract, image, slug)
                VALUES ( ?, ?, ?, ?, ?, ?, ? );`;
    connection.query(sql, [title, director, genre, release_year, abstract, imageName, slug], (err, results) => {
        if (err) {
            console.log(err);
        };
    });

    res.status(201);
    res.send({ message: 'aggiunta nuovo libro' })
};

module.exports = { index, show, store, storeReview };