//Require axios to make API calls
const axios = require('axios');
const unsplashBaseURL = 'https://api.unsplash.com';
const dotenv = require('dotenv').config();
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const getRawPhotoURLs = async (req, res) => {
  try {
    const response = await axios.get(
      `${unsplashBaseURL}/photos/?client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const photos = response.data;
    const rawPhotoURLs = photos.map(({ urls }) => urls.raw);
    return res.status(200).json(rawPhotoURLs);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const getPhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${unsplashBaseURL}/photos/${id}/?client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const photo = response.data;
    return res.status(200).json(photo);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { getRawPhotoURLs, getPhoto };
