function notFound(req, res) {

    res.status(404);
    res.json({
        errorStatus: 404,
        errorMessage: 'Resource not found'
    });
};

module.exports = notFound;