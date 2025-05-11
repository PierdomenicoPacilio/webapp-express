const connection = require('../data/db');


function index(req, res) {
    res.send('index movies');
};

function show(req, res) {
    res.send('show movies');
};

module.exports = { index, show };