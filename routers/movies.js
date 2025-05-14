const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');
const upload = require('../middlewares/multer');


//index
router.get('/', moviesController.index);
//show
router.get('/:id', moviesController.show);
//store
router.post('/', upload.single("image"), moviesController.store);
//store review
router.post('/:id/reviews', moviesController.storeReview);



module.exports = router;