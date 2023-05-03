// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'pixabay-client/build')));
const PORT = process.env.PORT || 3001;

app.get('/api/images/:category/:page', async (req, res) => {
  const { category, page } = req.params;
  const response = await axios.get(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${category}&image_type=photo&per_page=9&page=${page}`
  );
  res.json(response.data.hits);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pixabay-client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
