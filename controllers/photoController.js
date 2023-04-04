//Require axios to make API calls
const axios = require('axios');
const unsplashBaseURL = 'https://api.unsplash.com';
const dotenv = require('dotenv').config();
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

/*
Public Authentication
https://unsplash.com/documentation#:~:text=Authorization%3A%20Client%2DID%20YOUR_ACCESS_KEY
*/
const authorizationHeader = {
  Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
};

const getRawPhotoURLs = async (req, res) => {
  try {
    const response = await axios.get(`${unsplashBaseURL}/photos/`, {
      headers: authorizationHeader,
    });
    const photos = response.data;
    const rawPhotoURLs = photos.map(({ urls }) => urls.raw);
    return res.status(200).json(rawPhotoURLs);
  } catch (err) {
    return res
      .status(err.response.status)
      .json({ message: err.response.data?.errors[0] });
  }
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${unsplashBaseURL}/photos/${id}`, {
      headers: authorizationHeader,
    });
    const photo = response.data;
    return res.status(200).json(photo);
  } catch (err) {
    return res
      .status(err.response.status)
      .json({ message: err.response.data?.errors[0] });
  }
};

const getPhotosByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(
      `${unsplashBaseURL}/users/${username}/photos`,
      {
        headers: authorizationHeader,
      }
    );

    const userPhotos = response.data.map(({ id, user, description, urls }) => ({
      id,
      username: user.username,
      url: urls.raw,
      description: description || 'No description provided.',
    }));
    return res.status(200).json(userPhotos);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = { getRawPhotoURLs, getPhotoById, getPhotosByUsername };
