const express = require('express');
const axios = require('axios');
const router = express.Router();

const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes';

// Proxy route for searching books
router.get('/search', async (req, res) => {
  try {
    const { q, maxResults } = req.query;
    const response = await axios.get(`${GOOGLE_BOOKS_URL}?q=${encodeURIComponent(q)}&maxResults=${maxResults || 20}`);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy Search Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch books from Google API' });
  }
});

// Proxy route for trending (popular) books
router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_URL}?q=subject:classics&maxResults=12&orderBy=relevance`);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy Trending Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch trending books' });
  }
});

// Proxy route for book details
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy Details Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch book details' });
  }
});

module.exports = router;
