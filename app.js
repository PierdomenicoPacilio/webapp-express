const express = require('express');
const app = express();
const port = 3000;

//middleware
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');

//middlewares per asset statici
app.use(express.static('public'));

//middleware per il parsing del body
app.use(express.json());




app.get('/', (req, res) => {
    res.send('benvenuti nella WebApp!');
});





//use 500
app.use(handleErrors);

//use 404
app.use(notFound);




app.listen(port, () => {
    console.log('WebApp listening at port ' + port);
});
