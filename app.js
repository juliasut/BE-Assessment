const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const photoRoutes = require('./routes/photoRoutes');
const userRoutes = require('./routes/userRoutes')
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});

app.use('/api/photos', photoRoutes);

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
