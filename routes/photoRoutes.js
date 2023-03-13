const express = require('express');
const router = express.Router();
const {
  getRawPhotoURLs,
  getPhotoById,
  getPhotosByUsername
} = require('../controllers/photoController');

router.get('/', getRawPhotoURLs);
router.get('/:id', getPhotoById);
router.get('/user/:username', getPhotosByUsername)

module.exports = router;
