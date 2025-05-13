const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');


//index
router.get('/', moviesController.index);
//show
router.get('/:id', moviesController.show);
//store review
router.post('/:id/reviews', moviesController.storeReview);



module.exports = router;