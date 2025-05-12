const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

//middleware
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');


//routers
const moviesRouter = require('./routers/movies');

//cors
app.use(cors({
    origin: process.env.FE_APP
}));

//middlewares per asset statici
app.use(express.static('public'));

//middleware per il parsing del body
app.use(express.json());



//welcome page
app.get('/', (req, res) => {
    res.send('benvenuti nella WebApp!');
});

//movies
app.use('/api/movies', moviesRouter);





//use 500
app.use(handleErrors);

//use 404
app.use(notFound);




app.listen(port, () => {
    console.log('WebApp listening at port ' + port);
});
