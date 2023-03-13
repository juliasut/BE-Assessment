const express = require('express');
const router = express.Router();
const { getRawPhotoURLs, getPhoto } = require('../controllers/photoController');

router.get('/', getRawPhotoURLs);
router.get('/:id', getPhoto);

module.exports = router;
